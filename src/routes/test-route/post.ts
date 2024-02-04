import { FastifyInstance } from 'fastify';
import { z } from 'zod';

const Body = z.object({
  testRequired: z.string(),
  test: z.string()
});

type bodyType = z.infer<typeof Body>;

export default async function routes(fastify: FastifyInstance) {
  fastify.post<{ Body: bodyType }>(
    '/',
    {
      schema: {
        body: Body
      }
    },
    async (req) => {
      console.log(req.body);
    }
  );
}
