import { FastifyInstance } from 'fastify';
import { Todo, TodoSchema } from '../../types/zod-db-models';
import { z } from 'zod';

export default async function routes(fastify: FastifyInstance) {
  fastify.get<{ Reply: Todo[] }>(
    '/',
    {
      schema: {
        response: {
          '2xx': z.array(TodoSchema)
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
