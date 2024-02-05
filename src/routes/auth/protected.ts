import { FastifyInstance, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { AuthRequestI } from '../../types/types';

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

  const handler = async (request: FastifyRequest) => {
    const user = request.user as AuthRequestI;
    const user_id = user.payload.user_id;
    console.log(user_id);
    return { success: `accessed private route: ${user_id}` };
  };

  fastify.route<{ Reply: resType }>({
    method,
    url,
    schema,
    onRequest: [fastify.authenticate],
    handler
  });
}
