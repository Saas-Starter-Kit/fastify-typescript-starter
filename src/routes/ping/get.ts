import { FastifyInstance } from 'fastify';

export default async function routes(fastify: FastifyInstance) {
  fastify.get('/', async (req) => {
    req.log.info('healthy - status 200');
    return 'pong';
  });
}
