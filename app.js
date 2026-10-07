import { createServer } from 'node:http';
import { products } from './products.js';

export function createApp() {
  return createServer((req, res) => {
    const { pathname, searchParams } = new URL(req.url, 'http://localhost');
    if (req.method === 'GET' && pathname === '/api/products') {
      const q = (searchParams.get('q') ?? '').trim().toLowerCase();
      return json(res, 200, { products: q ? products.filter((p) => p.title.toLowerCase().includes(q)) : products });
    }
    if (req.method === 'GET' && pathname === '/health') return json(res, 200, { ok: true });
    json(res, 404, { error: 'NOT_FOUND' });
  });
}

function json(res, status, body) {
  res.writeHead(status, { 'content-type': 'application/json' });
  res.end(JSON.stringify(body));
}
