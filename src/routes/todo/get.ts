import { FastifyInstance } from 'fastify';
import { GetTodos as handler } from '../../controllers/todo';
import { GetTodosSchema as schema } from '../../schemas/todo';
import { todo } from '../../types/todo';

export default async function routes(fastify: FastifyInstance) {
  const method = 'GET';
  const url = '/';

  fastify.route<{ Reply: todo[] }>({ method, url, schema, handler });
}
