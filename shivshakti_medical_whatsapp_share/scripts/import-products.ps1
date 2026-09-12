param(
  [Parameter(Mandatory = $true)]
  [string]$ExcelPath,
  [string]$ProjectRoot
)

$ErrorActionPreference = 'Stop'

if ([string]::IsNullOrWhiteSpace($ProjectRoot)) {
  $ProjectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
}

$ExcelPath = [IO.Path]::GetFullPath($ExcelPath)
if (-not (Test-Path -LiteralPath $ExcelPath -PathType Leaf)) {
  throw "Excel file not found: $ExcelPath"
}

Add-Type -AssemblyName System.IO.Compression.FileSystem

$dataDirectory = Join-Path $ProjectRoot 'src\data'
$imageDirectory = Join-Path $ProjectRoot 'public\products'
$dataPath = Join-Path $dataDirectory 'products.json'

New-Item -ItemType Directory -Force -Path $dataDirectory, $imageDirectory | Out-Null

$archive = [IO.Compression.ZipFile]::OpenRead($ExcelPath)

function Read-ZipText([string]$Name) {
  $entry = $archive.GetEntry($Name)
  if ($null -eq $entry) {
    throw "Workbook entry not found: $Name"
  }

  $reader = [IO.StreamReader]::new($entry.Open())
  try {
    return $reader.ReadToEnd()
  }
  finally {
    $reader.Dispose()
  }
}

function Get-CellValue($Cell, [object[]]$SharedValues) {
  if ($null -eq $Cell) {
    return ''
  }

  $type = $Cell.GetAttribute('t')
  if ($type -eq 's' -and $null -ne $Cell.v) {
    return [string]$SharedValues[[int][string]$Cell.v]
  }

  if ($type -eq 'inlineStr' -and $null -ne $Cell.is) {
    return [string]$Cell.is.InnerText
  }

  if ($null -ne $Cell.v) {
    return [string]$Cell.v
  }

  return ''
}

function Normalize-Label([string]$Value) {
  if ([string]::IsNullOrWhiteSpace($Value)) {
    return ''
  }

  return [regex]::Replace($Value.Trim(), '\s+', ' ')
}

function Convert-ToNumber([string]$Value) {
  if ([string]::IsNullOrWhiteSpace($Value)) {
    return $null
  }

  $number = [decimal]0
  $parsed = [decimal]::TryParse(
    $Value,
    [Globalization.NumberStyles]::Any,
    [Globalization.CultureInfo]::InvariantCulture,
    [ref]$number
  )

  if ($parsed) {
    return $number
  }

  return $null
}

try {
  $sharedXml = [xml](Read-ZipText 'xl/sharedStrings.xml')
  $sharedValues = @($sharedXml.sst.si | ForEach-Object { $_.InnerText })
  $sheetXml = [xml](Read-ZipText 'xl/worksheets/sheet1.xml')
  $drawingXml = [xml](Read-ZipText 'xl/drawings/drawing1.xml')
  $drawingRelsXml = [xml](Read-ZipText 'xl/drawings/_rels/drawing1.xml.rels')

  $relationshipMap = @{}
  foreach ($relationship in @($drawingRelsXml.Relationships.Relationship)) {
    $relationshipMap[$relationship.Id] = $relationship.Target
  }

  $drawingNamespace = [Xml.XmlNamespaceManager]::new($drawingXml.NameTable)
  $drawingNamespace.AddNamespace('xdr', 'http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing')
  $drawingNamespace.AddNamespace('a', 'http://schemas.openxmlformats.org/drawingml/2006/main')
  $relationshipNamespace = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'

  $imageByRow = @{}
  $copiedImages = @{}
  $anchors = $drawingXml.SelectNodes('//xdr:twoCellAnchor|//xdr:oneCellAnchor', $drawingNamespace)

  foreach ($anchor in $anchors) {
    $from = $anchor.SelectSingleNode('./xdr:from', $drawingNamespace)
    if ($null -eq $from) {
      continue
    }

    $rowNode = $from.SelectSingleNode('./xdr:row', $drawingNamespace)
    $blip = $anchor.SelectSingleNode('.//a:blip', $drawingNamespace)
    if ($null -eq $rowNode -or $null -eq $blip) {
      continue
    }

    $rowNumber = [int]$rowNode.InnerText + 1
    if ($rowNumber -lt 3) {
      continue
    }

    $relationshipId = $blip.GetAttribute('embed', $relationshipNamespace)
    $target = $relationshipMap[$relationshipId]
    if ([string]::IsNullOrWhiteSpace($target)) {
      continue
    }

    $fileName = [IO.Path]::GetFileName($target)
    $mediaEntry = $archive.GetEntry("xl/media/$fileName")
    if ($null -eq $mediaEntry) {
      continue
    }

    $destination = Join-Path $imageDirectory $fileName
    if (-not $copiedImages.ContainsKey($fileName)) {
      $input = $mediaEntry.Open()
      $output = [IO.File]::Create($destination)
      try {
        $input.CopyTo($output)
      }
      finally {
        $output.Dispose()
        $input.Dispose()
      }

      $copiedImages[$fileName] = $true
    }

    $imageByRow[$rowNumber] = "/products/$fileName"
  }

  $products = @()
  $productRows = @($sheetXml.worksheet.sheetData.row | Where-Object { [int]$_.r -ge 3 }) | Sort-Object { [int]$_.r }

  foreach ($row in $productRows) {
    $cells = @{}
    foreach ($cell in @($row.c)) {
      if ($cell.r -match '^([A-Z]+)') {
        $cells[$Matches[1]] = $cell
      }
    }

    $serialNumber = Normalize-Label (Get-CellValue $cells['A'] $sharedValues)
    $title = Normalize-Label (Get-CellValue $cells['D'] $sharedValues)
    if ([string]::IsNullOrWhiteSpace($serialNumber) -or [string]::IsNullOrWhiteSpace($title)) {
      continue
    }

    $products += [ordered]@{
      id = "product-$serialNumber"
      serialNumber = $serialNumber
      category = Normalize-Label (Get-CellValue $cells['B'] $sharedValues)
      subCategory = Normalize-Label (Get-CellValue $cells['C'] $sharedValues)
      title = $title
      modelNumber = Normalize-Label (Get-CellValue $cells['E'] $sharedValues)
      description = (Get-CellValue $cells['G'] $sharedValues).Trim()
      mrp = Convert-ToNumber (Get-CellValue $cells['H'] $sharedValues)
      discountedPrice = Convert-ToNumber (Get-CellValue $cells['I'] $sharedValues)
      gstRate = Convert-ToNumber (Get-CellValue $cells['J'] $sharedValues)
      totalValue = Convert-ToNumber (Get-CellValue $cells['K'] $sharedValues)
      image = if ($imageByRow.ContainsKey([int]$row.r)) { $imageByRow[[int]$row.r] } else { $null }
    }
  }

  $json = $products | ConvertTo-Json -Depth 5
  $utf8NoBom = [Text.UTF8Encoding]::new($false)
  [IO.File]::WriteAllText($dataPath, $json, $utf8NoBom)

  $categoryCount = @($products | ForEach-Object { $_.category } | Sort-Object -Unique).Count
  Write-Host "Imported $($products.Count) products across $categoryCount categories."
  Write-Host "Copied $($copiedImages.Count) unique product images."
  Write-Host "Product data: $dataPath"
}
finally {
  $archive.Dispose()
}
