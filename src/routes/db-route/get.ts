import { FastifyInstance } from 'fastify';
import { TodoT, TodoModel } from '../../types/db-models';
import { Type } from '@sinclair/typebox';

export default async function routes(fastify: FastifyInstance) {
  fastify.get<{ Reply: TodoT[] }>(
    '/',
    {
      schema: {
        response: {
          '2xx': Type.Array(TodoModel)
        }
      }
    },
    async () => {
      try {
        const todos = await fastify.prisma.todo.findMany({
          take: 10
        });

        return todos;
      } catch (err) {
        throw err;
      }
    }
  );
}
