import { sendProductsResponse } from '../server/productApi.js';

export default function products(request, response) {
  if (request.method !== 'GET') {
    response.statusCode = 405;
    response.setHeader('Allow', 'GET');
    response.end('Method not allowed');
    return;
  }

  try {
    sendProductsResponse(request, response);
  } catch (error) {
    response.statusCode = 500;
    response.setHeader('Content-Type', 'application/json; charset=utf-8');
    response.end(JSON.stringify({ error: 'Unable to load products', detail: error.message }));
  }
}