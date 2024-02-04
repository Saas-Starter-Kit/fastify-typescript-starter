import { FastifyInstance } from 'fastify';

import { Type, Static } from '@sinclair/typebox';

const Body = Type.Object({
  testRequired: Type.String(),
  test: Type.Optional(Type.String())
});

type bodyType = Static<typeof Body>;

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
