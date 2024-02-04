import { FastifyInstance, FastifyRequest } from 'fastify';
import { z } from 'zod';

const Body = z.object({
  testRequired: z.string(),
  test: z.string()
});

type bodyType = z.infer<typeof Body>;

export default async function routes(fastify: FastifyInstance) {
  const method = 'POST';
  const url = '/';
  const schema = {
    body: Body
  };

  const handler = async (req: FastifyRequest) => {
    console.log(req.body);
  };

  fastify.route<{ Body: bodyType }>({
    method,
    url,
    schema,
    handler
  });
}
