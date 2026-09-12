/**
 * upload-certifications.js
 * One-time script: uploads all PDFs in public/certifications/ to Cloudinary
 * and writes the resulting URLs to scripts/cert-upload-results.json
 *
 * Usage: node scripts/upload-certifications.js
 */

import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const certsDir = path.join(root, 'public', 'certifications');
const resultsFile = path.join(__dirname, 'cert-upload-results.json');

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error('Missing Cloudinary credentials in .env');
  process.exit(1);
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const FOLDER = 'shivshakti-certifications';

const FILES = [
  { file: 'SHIVSHAKTI HEALTHCARE EQUIPMENTS (1).pdf',       publicId: 'ISO_9001_2015' },
  { file: 'ISO_13485_2016_Certificate.pdf',                 publicId: 'ISO_13485_2016' },
  { file: 'ISO_14001_2015_Certificate.pdf',                 publicId: 'ISO_14001_2015' },
  { file: 'ISO_45001_2018_Certificate.pdf',                 publicId: 'ISO_45001_2018' },
  { file: 'GMP_Certificate.pdf',                            publicId: 'GMP_Certificate' },
  { file: 'FDA SHIVSHAKTI HEALTHCARE EQUIPMENTS.pdf',       publicId: 'FDA_Certificate' },
  { file: 'CE_CERTIFICATE_ANNEXURE_UP_TO_1009_NO_ACCO.pdf', publicId: 'CE_Certificate' },
  { file: 'IEC_60601-1_2015_Certificate.pdf',               publicId: 'IEC_60601_1_2015' },
  { file: 'GST Registration Certificate.pdf',               publicId: 'GST_Certificate' },
  { file: 'MSME SHIVSHAKTI NEW.pdf',                        publicId: 'MSME_Certificate' },
  { file: 'OEWPS3977E.pdf',                                 publicId: 'IEC_Import_Export' },
];

async function uploadAll() {
  const results = {};
  let ok = 0;
  let fail = 0;

  for (const { file, publicId } of FILES) {
    const filePath = path.join(certsDir, file);
    if (!fs.existsSync(filePath)) {
      console.warn('Not found, skipping: ' + file);
      fail++;
      continue;
    }

    process.stdout.write('Uploading [' + publicId + '] ... ');
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        resource_type: 'raw',
        folder: FOLDER,
        public_id: publicId,
        overwrite: true,
        use_filename: false,
      });
      console.log('OK  ' + result.secure_url);
      results[publicId] = result.secure_url;
      ok++;
    } catch (err) {
      console.error('FAIL  ' + err.message);
      results[publicId] = null;
      fail++;
    }
  }

  fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2), 'utf8');
  console.log('Done -- ' + ok + ' uploaded, ' + fail + ' failed');
  console.log('Results saved to: ' + resultsFile);
}

uploadAll();
