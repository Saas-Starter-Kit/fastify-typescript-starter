const { test } = require('tap');
const { build } = require('../app.ts');

test('POST /sigup returns status 200', async (t) => {
  const app = build();

  t.after(async () => {
    await app.close();
  });

  const randomInt = Math.floor(Math.random() * 5);

  const res = await app.inject({
    method: 'POST',
    url: '/auth/signup',
    payload: {
      email: `test${randomInt}@yahoo.com`,
      password: 'pass1'
    }
  });

  t.matchStrict(res.statusCode, 200);
  t.hasProp(JSON.parse(res.payload), 'token');
});
