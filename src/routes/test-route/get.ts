import { FastifyInstance } from 'fastify';
import { z } from 'zod';

const Res = z.object({
  hello: z.string()
});

type resType = z.infer<typeof Res>;

export default async function routes(fastify: FastifyInstance) {
  const method = 'GET';
  const url = '/';

  const schema = {
    response: {
      '2xx': Res
    }
  };

  const handler = async () => {
    return { hello: 'world' };
  };

  fastify.route<{ Reply: resType }>({
    method,
    url,
    schema,
    handler
  });
}
