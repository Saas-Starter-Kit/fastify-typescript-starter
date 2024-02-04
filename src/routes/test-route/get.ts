import { FastifyInstance } from 'fastify';
import { z } from 'zod';

const Res = z.object({
  hello: z.string()
});

type resType = z.infer<typeof Res>;

export default async function routes(fastify: FastifyInstance) {
  fastify.get<{ Reply: resType }>(
    '/',
    {
      schema: {
        response: {
          '2xx': Res
        }
      }
    },
    async () => {
      return { hello: 'world' };
    }
  );
}
