import { FastifyInstance } from 'fastify';
import { TodoModel } from '../../types/db-models';
import { Prisma } from '@prisma/client';
import { Type, Static } from '@sinclair/typebox';

const TodoModelPost = Type.Omit(TodoModel, ['id']);
export type TodoT = Static<typeof TodoModelPost>;

export default async function routes(fastify: FastifyInstance) {
  fastify.post<{ Body: TodoT }>(
    '/',
    {
      schema: {
        body: TodoModelPost
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
