/**
 * server/certApi.js
 * Shared logic for /api/cert — used by:
 *   - server/index.js  (local production preview)
 *   - vite.config.js   (dev server middleware)
 *   - api/cert.js      (Vercel serverless function)
 */
import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';

export const CERT_MAP = {
  'ISO_9001_2015':    'shivshakti-certifications/ISO_9001_2015.pdf',
  'ISO_13485_2016':   'shivshakti-certifications/ISO_13485_2016.pdf',
  'ISO_14001_2015':   'shivshakti-certifications/ISO_14001_2015.pdf',
  'ISO_45001_2018':   'shivshakti-certifications/ISO_45001_2018.pdf',
  'GMP_Certificate':  'shivshakti-certifications/GMP_Certificate.pdf',
  'FDA_Certificate':  'shivshakti-certifications/FDA_Certificate.pdf',
  'IEC_60601_1_2015': 'shivshakti-certifications/IEC_60601_1_2015.pdf',
  'GST_Certificate':  'shivshakti-certifications/GST_Certificate.pdf',
  'MSME_Certificate': 'shivshakti-certifications/MSME_Certificate.pdf',
  'IEC_Import_Export':'shivshakti-certifications/IEC_Import_Export.pdf',
};

let configured = false;
function ensureCloudinary() {
  if (configured) return;
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    throw new Error('Missing Cloudinary credentials in environment');
  }
  cloudinary.config({ cloud_name: CLOUDINARY_CLOUD_NAME, api_key: CLOUDINARY_API_KEY, api_secret: CLOUDINARY_API_SECRET });
  configured = true;
}

export async function sendCertResponse(searchParams, res) {
  ensureCloudinary();

  const id = searchParams.get('id');
  const publicId = CERT_MAP[id];

  if (!publicId) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ error: 'Certificate not found' }));
    return;
  }

  const signedUrl = cloudinary.url(publicId, {
    resource_type: 'raw',
    type: 'upload',
    sign_url: true,
    secure: true,
    expires_at: Math.floor(Date.now() / 1000) + 3600,
  });

  const upstream = await fetch(signedUrl);
  if (!upstream.ok) {
    res.statusCode = 502;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ error: 'Failed to fetch certificate from CDN', status: upstream.status }));
    return;
  }

  const buffer = await upstream.arrayBuffer();
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Length', buffer.byteLength);
  res.setHeader('Cache-Control', 'private, max-age=3600');
  res.setHeader('Content-Disposition', 'inline');
  res.end(Buffer.from(buffer));
}
