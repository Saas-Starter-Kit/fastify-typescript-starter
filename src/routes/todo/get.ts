import { FastifyInstance } from 'fastify';
import { Todo } from '../../types/zod-db-models';
import { GetTodos as handler } from '../../controllers/todo';
import { GetTodosSchema as schema } from '../../schemas/todo';

export default async function routes(fastify: FastifyInstance) {
  const method = 'GET';
  const url = '/';

  fastify.route<{ Reply: Todo[] }>({ method, url, schema, handler });
}
