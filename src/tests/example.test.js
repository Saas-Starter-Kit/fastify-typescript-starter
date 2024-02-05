import { test } from 'tap';
import buildApp from '../app.ts';

test('GET /todos returns status 200', async (t) => {
  const app = buildApp();

  t.after(async () => {
    await app.close();
  });

  const res = await app.inject({
    method: 'GET',
    url: '/example'
  });

  assert.deepStrictEqual(res.statusCode, 200);
});
