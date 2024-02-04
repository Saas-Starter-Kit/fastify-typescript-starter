import { FastifyInstance } from 'fastify';
import { Prisma } from '@prisma/client';
import { z } from 'zod';

import { TodoSchema } from '../../types/zod-db-models';

const TodoSchemaPost = TodoSchema.omit({ id: true });
type TodoT = z.infer<typeof TodoSchemaPost>;

export default async function routes(fastify: FastifyInstance) {
  fastify.post<{ Body: TodoT }>(
    '/',
    {
      schema: {
        body: TodoSchemaPost
      }
    },
    async (req) => {
      const { title, description } = req.body;
      const data: Prisma.TodoCreateInput = {
        title,
        description
      };

      try {
        await fastify.prisma.todo.create({ data });
      } catch (err) {
        throw err;
      }
    }
  );
}
