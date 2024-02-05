import { FastifyInstance } from 'fastify';
import { z } from 'zod';

const Res = z.object({
  success: z.string()
});

type resType = z.infer<typeof Res>;

export default async function routes(fastify: FastifyInstance) {
  const method = 'GET';
  const url = '/protected';

  const schema = {
    response: {
      '2xx': Res
    }
  };

  const handler = async () => {
    return { success: 'accessed private route' };
  };

  fastify.route<{ Reply: resType }>({
    method,
    url,
    schema,
    onRequest: [fastify.authenticate],
    handler
  });
}
