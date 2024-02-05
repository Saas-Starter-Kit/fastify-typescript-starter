import { FastifyInstance } from 'fastify';

import { Login as handler } from '../../controllers/auth';
import { CreateUserSchema as schema } from '../../schemas/user';
import { UserCreateT } from '../../types/user';

export default async function routes(fastify: FastifyInstance) {
  const method = 'POST';
  const url = '/login';

  fastify.route<{ Body: UserCreateT }>({
    method,
    url,
    schema,
    handler
  });
}
