import { FastifyInstance } from 'fastify';
import { CreateTodoSchema as schema } from '../../schemas/todo';
import { CreateTodo as handler } from '../../controllers/todo';
import { TodoCreateT } from '../../types/todo';

export default async function routes(fastify: FastifyInstance) {
  const method = 'POST';
  const url = '/';

  fastify.route<{ Body: TodoCreateT }>({
    method,
    url,
    schema,
    handler
  });
}
