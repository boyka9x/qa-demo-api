import { createServer } from 'node:http';
import { products } from './products.js';

export function createApp() {
  return createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/api/products') return json(res, 200, { products });
    if (req.method === 'GET' && req.url === '/health') return json(res, 200, { ok: true });
    json(res, 404, { error: 'NOT_FOUND' });
  });
}

function json(res, status, body) {
  res.writeHead(status, { 'content-type': 'application/json' });
  res.end(JSON.stringify(body));
}
