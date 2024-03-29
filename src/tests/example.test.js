const { test } = require('tap');
const { build } = require('../app.ts');

test('GET /example returns status 200', async (t) => {
  const app = build();

  t.after(async () => {
    await app.close();
  });

  const res = await app.inject({
    method: 'GET',
    url: '/example'
  });

  t.matchStrict(res.statusCode, 200);
  t.matchStrict(JSON.parse(res.payload), { hello: 'world' });
});

test('POST /example returns status 200', async (t) => {
  const app = build();

  t.after(async () => {
    await app.close();
  });

  const res = await app.inject({
    method: 'POST',
    url: '/example',
    payload: {
      testRequired: 'test',
      test: 'test'
    }
  });

  t.matchStrict(res.statusCode, 200);
});

test('POST /example returns status 400', async (t) => {
  const app = build();

  t.after(async () => {
    await app.close();
  });

  const res = await app.inject({
    method: 'POST',
    url: '/example',
    payload: {
      //testRequired: 'test',
      test: 'test'
    }
  });

  t.matchStrict(res.statusCode, 400);
});
