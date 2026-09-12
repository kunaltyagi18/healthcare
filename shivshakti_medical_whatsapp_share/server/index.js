import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sendProductsResponse } from './productApi.js';

const serverDirectory = path.dirname(fileURLToPath(import.meta.url));
const distDirectory = path.resolve(serverDirectory, '../dist');
const port = Number.parseInt(globalThis.process?.env?.PORT ?? '4173', 10);

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function resolveStaticFile(requestPath) {
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(requestPath);
  } catch {
    return null;
  }

  const candidate = path.resolve(distDirectory, `.${decodedPath}`);
  const isInsideDist = candidate === distDirectory || candidate.startsWith(`${distDirectory}${path.sep}`);
  return isInsideDist ? candidate : null;
}

function sendFile(filePath, res) {
  const extension = path.extname(filePath).toLowerCase();
  res.statusCode = 200;
  res.setHeader('Content-Type', mimeTypes[extension] ?? 'application/octet-stream');
  createReadStream(filePath).on('error', () => {
    if (!res.headersSent) res.statusCode = 500;
    res.end('Unable to read the requested file.');
  }).pipe(res);
}

const server = createServer((req, res) => {
  const requestUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);

  if (requestUrl.pathname === '/api/products') {
    if (req.method !== 'GET') {
      res.statusCode = 405;
      res.setHeader('Allow', 'GET');
      res.end('Method not allowed');
      return;
    }

    try {
      sendProductsResponse(req, res);
    } catch (error) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify({ error: 'Unable to load products', detail: error.message }));
    }
    return;
  }

  let filePath = resolveStaticFile(requestUrl.pathname);
  if (!filePath || !existsSync(filePath) || statSync(filePath).isDirectory()) {
    filePath = path.join(distDirectory, 'index.html');
  }

  if (!existsSync(filePath)) {
    res.statusCode = 503;
    res.end('Build the app before starting the production server.');
    return;
  }

  sendFile(filePath, res);
});

server.listen(port, () => {
  console.log(`Shivshakti app listening on http://localhost:${port}`);
});
