import { FastifyInstance } from 'fastify';
import { Type, Static } from '@sinclair/typebox';

const Res = Type.Object({
  hello: Type.String()
});

type resType = Static<typeof Res>;

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
