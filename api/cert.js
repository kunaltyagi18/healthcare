import { v2 as cloudinary } from 'cloudinary';

// Map: short cert ID -> Cloudinary public_id
const CERT_MAP = {
  'ISO_9001_2015':   'shivshakti-certifications/ISO_9001_2015.pdf',
  'ISO_13485_2016':  'shivshakti-certifications/ISO_13485_2016.pdf',
  'ISO_14001_2015':  'shivshakti-certifications/ISO_14001_2015.pdf',
  'ISO_45001_2018':  'shivshakti-certifications/ISO_45001_2018.pdf',
  'GMP_Certificate': 'shivshakti-certifications/GMP_Certificate.pdf',
  'FDA_Certificate': 'shivshakti-certifications/FDA_Certificate.pdf',
  'IEC_60601_1_2015':'shivshakti-certifications/IEC_60601_1_2015.pdf',
  'GST_Certificate': 'shivshakti-certifications/GST_Certificate.pdf',
  'MSME_Certificate':'shivshakti-certifications/MSME_Certificate.pdf',
  'IEC_Import_Export':'shivshakti-certifications/IEC_Import_Export.pdf',
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).end('Method Not Allowed');
  }

  const { id } = req.query;
  const publicId = CERT_MAP[id];

  if (!publicId) {
    return res.status(404).json({ error: 'Certificate not found' });
  }

  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    return res.status(500).json({ error: 'Server misconfiguration: missing Cloudinary credentials' });
  }

  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });

  // Generate a signed URL valid for 1 hour
  const signedUrl = cloudinary.url(publicId, {
    resource_type: 'raw',
    type: 'upload',
    sign_url: true,
    secure: true,
    expires_at: Math.floor(Date.now() / 1000) + 3600,
  });

  try {
    const upstream = await fetch(signedUrl);
    if (!upstream.ok) {
      return res.status(502).json({ error: 'Failed to fetch certificate from CDN', status: upstream.status });
    }

    const buffer = await upstream.arrayBuffer();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Length', buffer.byteLength);
    res.setHeader('Cache-Control', 'private, max-age=3600');
    res.setHeader('Content-Disposition', 'inline');
    return res.status(200).send(Buffer.from(buffer));
  } catch (err) {
    return res.status(500).json({ error: 'Internal error fetching certificate', detail: err.message });
  }
}
