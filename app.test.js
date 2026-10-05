import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from './app.js';

async function get(path) {
  const server = createApp().listen(0);
  const { port } = server.address();
  try {
    const res = await fetch(`http://127.0.0.1:${port}${path}`);
    return { status: res.status, body: await res.json() };
  } finally {
    server.close();
  }
}

test('GET /api/products lists the products', async () => {
  const { status, body } = await get('/api/products');
  assert.equal(status, 200);
  assert.equal(body.products.length, 3);
  assert.deepEqual(Object.keys(body.products[0]), ['id', 'title', 'price', 'stock']);
});

test('unknown path is 404', async () => {
  const { status, body } = await get('/nope');
  assert.equal(status, 404);
  assert.equal(body.error, 'NOT_FOUND');
});
