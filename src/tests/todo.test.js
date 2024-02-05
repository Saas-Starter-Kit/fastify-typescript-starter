const { test } = require('tap');
const { build } = require('../app.ts');

test('GET /todo returns status 200', async (t) => {
  const app = build();

  t.after(async () => {
    await app.close();
  });

  const res = await app.inject({
    method: 'GET',
    url: '/todo'
  });

  t.matchStrict(res.statusCode, 200);
});

test('POST /todo returns status 200', async (t) => {
  const app = build();

  t.after(async () => {
    await app.close();
  });

  const res = await app.inject({
    method: 'POST',
    url: '/todo',
    payload: {
      title: 'test',
      description: 'test'
    }
  });

  t.matchStrict(res.statusCode, 200);
});

test('POST /todo returns status 400', async (t) => {
  const app = build();

  t.after(async () => {
    await app.close();
  });

  const res = await app.inject({
    method: 'POST',
    url: '/todo',
    payload: {
      //  title: 'test',
      description: 'test'
    }
  });

  t.matchStrict(res.statusCode, 400);
});
