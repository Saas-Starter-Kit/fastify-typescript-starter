import { FastifyInstance } from 'fastify';

import { SignUp as handler } from '../../controllers/auth';
import { CreateUserSchema as schema } from '../../schemas/user';
import { user } from '../../types/user';

export default async function routes(fastify: FastifyInstance) {
  const method = 'POST';
  const url = '/signup';

  fastify.route<{ Body: user }>({
    method,
    url,
    schema,
    handler
  });
}
