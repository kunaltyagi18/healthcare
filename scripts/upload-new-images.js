/**
 * upload-new-images.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Shivshakti Medical — Image Migration Pipeline (Node.js, runs in /scripts/)
 *
 * 4 Phases, each triggered by a CLI flag:
 *   --extract   Extract ZIPs from /raw-zips/ → /raw-new-images/ (sanitize names)
 *   --match     Match extracted images to products in src/data/products.json
 *   --upload    Upload matched images to Cloudinary, write products-updated.json
 *   --finalize  Back up + overwrite src/data/products.json with updated version
 *
 * Run: node scripts/upload-new-images.js --<phase>
 * ─────────────────────────────────────────────────────────────────────────────
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';

// ─── Path Helpers ────────────────────────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const PATHS = {
  rawZips:          path.join(ROOT, 'raw-zips'),
  rawImages:        path.join(ROOT, 'raw-new-images'),
  extracted:        path.join(ROOT, 'raw-new-images', 'extracted'),
  productsJson:     path.join(ROOT, 'src', 'data', 'products.json'),
  productsUpdated:  path.join(ROOT, 'public', 'data', 'products-updated.json'),
  scriptsDir:       path.join(ROOT, 'scripts'),
  backupsDir:       path.join(ROOT, 'scripts', 'backups'),
  filenameMapping:  path.join(ROOT, 'scripts', 'filename-mapping.json'),
  extractFailures:  path.join(ROOT, 'scripts', 'extract-failures.json'),
  matchReport:      path.join(ROOT, 'scripts', 'match-report.json'),
  uploadProgress:   path.join(ROOT, 'scripts', 'upload-progress.json'),
  uploadFailures:   path.join(ROOT, 'scripts', 'upload-failures.json'),
};

// ─── Utilities ───────────────────────────────────────────────────────────────

function normalize(str = '') {
  return str.toLowerCase().replace(/[\s\-_]+/g, '').replace(/[^a-z0-9]/g, '');
}

function sanitizeFilename(originalName) {
  const ext = path.extname(originalName).toLowerCase();
  const stem = path.basename(originalName, ext);
  const cleanStem = stem
    .replace(/[^\w. -]/g, '_')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .slice(0, 50)
    .replace(/[-_]+$/, '');
  return cleanStem + ext;
}

function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

function readJson(filePath, defaultVal = {}) {
  if (!fs.existsSync(filePath)) return defaultVal;
  try { return JSON.parse(fs.readFileSync(filePath, 'utf8')); }
  catch { return defaultVal; }
}

function walkDir(dir, results = []) {
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkDir(full, results);
    else results.push(full);
  }
  return results;
}

function similarity(a, b) {
  a = normalize(a); b = normalize(b);
  if (a === b) return 1;
  if (!a.length || !b.length) return 0;
  if (a.includes(b) || b.includes(a)) return 0.8;
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++)
    for (let j = 1; j <= a.length; j++)
      matrix[i][j] = b[i-1] === a[j-1]
        ? matrix[i-1][j-1]
        : Math.min(matrix[i-1][j-1]+1, matrix[i][j-1]+1, matrix[i-1][j]+1);
  return 1 - matrix[b.length][a.length] / Math.max(a.length, b.length);
}

// ─── Phase 1: EXTRACT ────────────────────────────────────────────────────────

async function phaseExtract() {
  console.log('\n╔══════════════════════════════════════╗');
  console.log('║  PHASE 1: EXTRACT                   ║');
  console.log('╚══════════════════════════════════════╝\n');

  // Accept zips from /raw-zips/ OR directly from /raw-new-images/ (user may place them there)
  fs.mkdirSync(PATHS.rawZips, { recursive: true });
  fs.mkdirSync(PATHS.extracted, { recursive: true });

  let AdmZip;
  try {
    const mod = await import('adm-zip');
    AdmZip = mod.default ?? mod;
  } catch {
    console.error('❌  Cannot import adm-zip. Run: npm install adm-zip --save-dev');
    process.exit(1);
  }

  // Collect zips from BOTH locations
  const zipSources = [
    ...(fs.existsSync(PATHS.rawZips)
      ? fs.readdirSync(PATHS.rawZips)
          .filter(f => f.toLowerCase().endsWith('.zip'))
          .map(f => path.join(PATHS.rawZips, f))
      : []),
    ...(fs.existsSync(PATHS.rawImages)
      ? fs.readdirSync(PATHS.rawImages)
          .filter(f => f.toLowerCase().endsWith('.zip'))
          .map(f => path.join(PATHS.rawImages, f))
      : []),
  ];

  if (!zipSources.length) {
    console.warn('⚠️  No .zip files found in /raw-zips/ or /raw-new-images/.');
    return;
  }
  console.log(`📦  Found ${zipSources.length} zip file(s):`);
  zipSources.forEach(z => console.log(`    ${path.basename(z)}`));
  console.log(`\n📁  Extracting into: raw-new-images/extracted/\n`);

  // Keep the previous archive-to-file mapping so re-running this phase is
  // incremental. This prevents old ZIPs from being extracted and uploaded a
  // second time when new ZIPs are added to the same folder.
  const filenameMapping = readJson(PATHS.filenameMapping, {});
  const extractFailures = [];
  let totalExtracted = 0;

  for (const zipPath of zipSources) {
    const zipFile = path.basename(zipPath);
    console.log(`📂  Processing: ${zipFile}`);
    let zip;
    try { zip = new AdmZip(zipPath); }
    catch (err) {
      console.error(`   ❌  Failed to open: ${err.message}`);
      extractFailures.push({ zipFile, error: err.message });
      continue;
    }

    const usedNames = new Set(fs.readdirSync(PATHS.extracted));
    let zipExtracted = 0, zipFailed = 0;

    for (const entry of zip.getEntries()) {
      if (entry.isDirectory) continue;
      const entryName = entry.entryName;
      const lowerName = entryName.toLowerCase();
      if (!['.jpg','.jpeg','.png','.webp'].some(e => lowerName.endsWith(e))) continue;

      const existingName = filenameMapping[entryName];
      if (existingName && fs.existsSync(path.join(PATHS.extracted, existingName))) {
        continue;
      }

      let sanitized = sanitizeFilename(path.basename(entryName));
      if (usedNames.has(sanitized)) {
        const ext = path.extname(sanitized);
        const stem = path.basename(sanitized, ext);
        let c = 1;
        while (usedNames.has(`${stem}_${c}${ext}`)) c++;
        sanitized = `${stem}_${c}${ext}`;
      }
      usedNames.add(sanitized);
      filenameMapping[entryName] = sanitized;

      try {
        fs.writeFileSync(path.join(PATHS.extracted, sanitized), entry.getData());
        zipExtracted++; totalExtracted++;
      } catch (err) {
        console.error(`   ❌  "${entryName}": ${err.message}`);
        extractFailures.push({ zipFile, entry: entryName, sanitized, error: err.message });
        zipFailed++;
      }
    }
    console.log(`   ✅  Extracted: ${zipExtracted}  |  ❌ Failed: ${zipFailed}\n`);
  }

  writeJson(PATHS.filenameMapping, filenameMapping);
  writeJson(PATHS.extractFailures, { totalFailures: extractFailures.length, failures: extractFailures });

  console.log(`📊  Total extracted: ${totalExtracted}  |  Failures: ${extractFailures.length}`);
  console.log('    Mapping → scripts/filename-mapping.json');
  if (extractFailures.length) console.log('    ⚠️  Failures → scripts/extract-failures.json');
  console.log('\n✅  Phase 1 complete.\n');
}

// ─── Phase 2: MATCH ──────────────────────────────────────────────────────────

async function phaseMatch() {
  console.log('\n╔══════════════════════════════════════╗');
  console.log('║  PHASE 2: MATCH                     ║');
  console.log('╚══════════════════════════════════════╝\n');

  if (!fs.existsSync(PATHS.productsJson)) {
    console.error(`❌  products.json not found at: ${PATHS.productsJson}`); process.exit(1);
  }
  const products = JSON.parse(fs.readFileSync(PATHS.productsJson, 'utf8'));
  console.log(`📋  Loaded ${products.length} products`);

  const modelMap = new Map();
  const modelSuffixMap = new Map();
  const serialMap = new Map();
  for (const p of products) {
    const model = p.modelNumber || p.model || '';
    if (model) {
      modelMap.set(normalize(model), p);
      const suffix = String(model).match(/(\d+)$/)?.[1];
      if (suffix) {
        modelSuffixMap.set(suffix, modelSuffixMap.has(suffix) ? null : p);
      }
    }
    const serial = normalize(p.serialNumber || '');
    if (serial) serialMap.set(serial, p);
  }

  const scanDir = fs.existsSync(PATHS.extracted) ? PATHS.extracted : PATHS.rawImages;
  if (!fs.existsSync(scanDir)) {
    console.error('❌  No extracted images found. Run --extract first.'); process.exit(1);
  }

  const IMAGE_EXTS = new Set(['.jpg','.jpeg','.png','.webp']);
  const allFiles = walkDir(scanDir).filter(f => IMAGE_EXTS.has(path.extname(f).toLowerCase()));
  console.log(`🖼️   Found ${allFiles.length} image files in ${path.relative(ROOT, scanDir)}\n`);

  const productAssignments = {};
  const unmatched = [];
  let matchedCount = 0;

  for (const filePath of allFiles) {
    const filename = path.basename(filePath);
    const filenameNorm = normalize(path.basename(filename, path.extname(filename)));
    const subFolder = path.relative(PATHS.rawImages, path.dirname(filePath));
    let matched = false;

    // Priority A: model number in filename
    for (const [normModel, product] of modelMap.entries()) {
      if (filenameNorm.includes(normModel)) {
        const key = product.modelNumber || product.model;
        if (!productAssignments[key]) productAssignments[key] = { product, imagePaths: [] };
        productAssignments[key].imagePaths.push(filePath);
        matched = true; matchedCount++; break;
      }
    }
    if (matched) continue;

    // Priority B: numeric filenames commonly use the model suffix (624, 625)
    // or the product serial number (for example, 89.png).
    const leadingNumber = filename.match(/^(\d+)/)?.[1];
    if (leadingNumber) {
      const modelSuffixProduct = modelSuffixMap.get(leadingNumber);
      const serialProduct = serialMap.get(leadingNumber);
      const numericStemOnly = filenameNorm === leadingNumber;
      const numericProduct = numericStemOnly
        ? serialProduct || modelSuffixProduct
        : modelSuffixProduct || serialProduct;

      if (numericProduct) {
        const key = numericProduct.modelNumber || numericProduct.model;
        if (!productAssignments[key]) productAssignments[key] = { product: numericProduct, imagePaths: [] };
        productAssignments[key].imagePaths.push(filePath);
        matched = true;
        matchedCount++;
      }
    }
    if (matched) continue;

    // Priority C: fuzzy category + title match
    let bestScore = 0, bestProduct = null;
    for (const p of products) {
      const catScore = Math.max(similarity(subFolder, p.category || ''), similarity(subFolder, p.subCategory || ''));
      const titleScore = similarity(filenameNorm, p.title || p.name || '');
      const combined = catScore * 0.4 + titleScore * 0.6;
      if (combined > bestScore && combined >= 0.4) { bestScore = combined; bestProduct = p; }
    }

    if (bestProduct) {
      const key = bestProduct.modelNumber || bestProduct.model;
      if (!productAssignments[key]) productAssignments[key] = { product: bestProduct, imagePaths: [] };
      productAssignments[key].imagePaths.push(filePath);
      matchedCount++;
    } else {
      unmatched.push(filePath);
    }
  }

  const assignmentList = Object.entries(productAssignments).map(([key, val]) => ({
    modelNumber: key,
    productTitle: val.product.title || val.product.name || '',
    category: val.product.category || '',
    subCategory: val.product.subCategory || '',
    imagePaths: val.imagePaths,
    imageCount: val.imagePaths.length,
  }));

  writeJson(PATHS.matchReport, {
    generatedAt: new Date().toISOString(),
    summary: {
      totalImagesProcessed: allFiles.length,
      totalMatched: matchedCount,
      totalUnmatched: unmatched.length,
      productsWithImages: assignmentList.length,
    },
    assignments: assignmentList,
    unmatched,
  });

  console.log(`📊  Processed: ${allFiles.length}  |  Matched: ${matchedCount}  |  Unmatched: ${unmatched.length}`);
  console.log(`    Products with images: ${assignmentList.length}`);
  console.log('\n📄  Report → scripts/match-report.json');
  console.log('    ⚠️   Review before running --upload.\n');
  console.log('✅  Phase 2 complete.\n');
}

// ─── Phase 3: UPLOAD ─────────────────────────────────────────────────────────

async function phaseUpload() {
  console.log('\n╔══════════════════════════════════════╗');
  console.log('║  PHASE 3: UPLOAD                    ║');
  console.log('╚══════════════════════════════════════╝\n');

  if (!fs.existsSync(PATHS.matchReport)) {
    console.error('❌  match-report.json not found. Run --match first.'); process.exit(1);
  }

  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    console.error('❌  Missing Cloudinary env vars in .env'); process.exit(1);
  }

  cloudinary.config({ cloud_name: CLOUDINARY_CLOUD_NAME, api_key: CLOUDINARY_API_KEY, api_secret: CLOUDINARY_API_SECRET });

  const report = readJson(PATHS.matchReport);
  const products = JSON.parse(fs.readFileSync(PATHS.productsJson, 'utf8'));
  const progress = readJson(PATHS.uploadProgress, {});
  const assignments = report.assignments || [];
  const failures = [];

  // Build task list (skip already uploaded)
  const tasks = [];
  for (const assignment of assignments) {
    for (let i = 0; i < assignment.imagePaths.length; i++) {
      const imgPath = assignment.imagePaths[i];
      const progressKey = `${assignment.modelNumber}::${imgPath}`;
      if (progress[progressKey]) continue;
      const safeModel = assignment.modelNumber.replace(/[^a-zA-Z0-9\-_]/g, '_');
      tasks.push({ assignment, imgPath, publicId: `${safeModel}_${i + 1}`, progressKey });
    }
  }

  const alreadyDone = Object.keys(progress).length;
  const total = alreadyDone + tasks.length;
  console.log(`📤  Queue: ${tasks.length} to upload  (${alreadyDone} already done, ${total} total)\n`);

  async function uploadWithRetry(task) {
    for (let attempt = 0; attempt <= 2; attempt++) {
      try {
        return await cloudinary.uploader.upload(task.imgPath, {
          folder: 'shivshakti-products',
          public_id: task.publicId,
          overwrite: false,
          resource_type: 'image',
        });
      } catch (err) {
        if (attempt < 2) await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
        else throw err;
      }
    }
  }

  let doneCount = alreadyDone;
  const CONCURRENCY = 5;

  for (let i = 0; i < tasks.length; i += CONCURRENCY) {
    const batch = tasks.slice(i, i + CONCURRENCY);
    const results = await Promise.allSettled(batch.map(t => uploadWithRetry(t)));

    for (let j = 0; j < batch.length; j++) {
      const task = batch[j];
      const res = results[j];
      doneCount++;

      if (res.status === 'fulfilled') {
        progress[task.progressKey] = {
          secure_url: res.value.secure_url,
          public_id: res.value.public_id,
          modelNumber: task.assignment.modelNumber,
          imagePath: task.imgPath,
        };
        writeJson(PATHS.uploadProgress, progress);
      } else {
        console.error(`   ❌  ${task.imgPath}: ${res.reason?.message}`);
        failures.push({ modelNumber: task.assignment.modelNumber, imagePath: task.imgPath, publicId: task.publicId, error: res.reason?.message });
      }

      if (doneCount % 10 === 0 || doneCount === total) {
        console.log(`   📤  Uploaded ${doneCount}/${total}...`);
      }
    }
  }

  writeJson(PATHS.uploadFailures, { totalFailures: failures.length, failures });
  if (failures.length) console.log(`\n⚠️   ${failures.length} failure(s) → scripts/upload-failures.json`);

  // Build products-updated.json
  console.log('\n📝  Building products-updated.json...');

  const urlsByModel = {};
  for (const entry of Object.values(progress)) {
    const { modelNumber, secure_url, public_id } = entry;
    if (!urlsByModel[modelNumber]) urlsByModel[modelNumber] = [];
    urlsByModel[modelNumber].push({ public_id, secure_url });
  }
  for (const model of Object.keys(urlsByModel)) {
    urlsByModel[model].sort((a, b) => {
      const nA = parseInt(a.public_id.split('_').pop(), 10) || 0;
      const nB = parseInt(b.public_id.split('_').pop(), 10) || 0;
      return nA - nB;
    });
  }

  let updatedCount = 0, noPhotoCount = 0;
  const updatedProducts = products.map(p => {
    const key = p.modelNumber || p.model || '';
    const entries = urlsByModel[key];
    if (entries?.length) {
      updatedCount++;
      const uploadedUrls = entries.map(e => e.secure_url);
      const existingUrls = [
        ...(Array.isArray(p.images) ? p.images : []),
        ...(p.image ? [p.image] : []),
      ].filter(url => !String(url).startsWith('/products/'));
      const urls = [...new Set([...uploadedUrls, ...existingUrls])];
      return { ...p, image: uploadedUrls[0] || p.image || urls[0], images: urls };
    }
    noPhotoCount++;
    return p;
  });

  fs.mkdirSync(path.dirname(PATHS.productsUpdated), { recursive: true });
  fs.writeFileSync(PATHS.productsUpdated, JSON.stringify(updatedProducts, null, 2), 'utf8');

  console.log(`\n📊  Products updated: ${updatedCount}  |  Still no photo: ${noPhotoCount}  |  Failures: ${failures.length}`);
  console.log('📄  Output → public/data/products-updated.json');
  console.log('    ⚠️   Review before running --finalize.\n');
  console.log('✅  Phase 3 complete.\n');
}

// ─── Phase 4: FINALIZE ───────────────────────────────────────────────────────

async function phaseFinalize() {
  console.log('\n╔══════════════════════════════════════╗');
  console.log('║  PHASE 4: FINALIZE                  ║');
  console.log('╚══════════════════════════════════════╝\n');

  if (!fs.existsSync(PATHS.productsUpdated)) {
    console.error('❌  products-updated.json not found. Run --upload first.'); process.exit(1);
  }
  if (!fs.existsSync(PATHS.productsJson)) {
    console.error(`❌  products.json not found at: ${PATHS.productsJson}`); process.exit(1);
  }

  fs.mkdirSync(PATHS.backupsDir, { recursive: true });
  const ts = new Date().toISOString().replace(/[:.]/g, '-').replace('T', '_').slice(0, 19);
  const backupName = `products-backup-${ts}.json`;
  const backupPath = path.join(PATHS.backupsDir, backupName);

  fs.copyFileSync(PATHS.productsJson, backupPath);
  console.log(`💾  Backup saved to: scripts/backups/${backupName}`);

  fs.copyFileSync(PATHS.productsUpdated, PATHS.productsJson);
  console.log(`✅  products.json updated.`);
  console.log(`\n    Backup: scripts/backups/${backupName}`);
  console.log('    To roll back: copy the backup over src/data/products.json\n');
  console.log('✅  Phase 4 complete. Pipeline finished!\n');
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const doExtract  = args.includes('--extract');
const doMatch    = args.includes('--match');
const doUpload   = args.includes('--upload');
const doFinalize = args.includes('--finalize');

if (!doExtract && !doMatch && !doUpload && !doFinalize) {
  console.log(`
Usage: node scripts/upload-new-images.js [--extract] [--match] [--upload] [--finalize]

  --extract    Extract ZIPs from /raw-zips/ into /raw-new-images/ (sanitize filenames)
  --match      Match extracted images to products (generates scripts/match-report.json)
  --upload     Upload to Cloudinary, build public/data/products-updated.json
  --finalize   Backup + replace src/data/products.json with products-updated.json
`);
  process.exit(0);
}

(async () => {
  if (doExtract)  await phaseExtract();
  if (doMatch)    await phaseMatch();
  if (doUpload)   await phaseUpload();
  if (doFinalize) await phaseFinalize();
})().catch(err => {
  console.error('\n💥  Unexpected error:', err);
  process.exit(1);
});
