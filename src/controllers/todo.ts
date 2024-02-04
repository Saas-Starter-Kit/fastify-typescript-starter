import { FastifyInstance, FastifyRequest } from 'fastify';
import { Prisma } from '@prisma/client';
import { TodoCreateT } from '../types/todo';

export async function GetTodos(this: FastifyInstance) {
  try {
    const todos = await this.prisma.todo.findMany({
      take: 10
    });

    return todos;
  } catch (err) {
    throw err;
  }
}

interface CreateTodoRequestI extends FastifyRequest {
  body: TodoCreateT;
}

export async function CreateTodo(this: FastifyInstance, req: CreateTodoRequestI) {
  const { title, description } = req.body;

  const data: Prisma.TodoCreateInput = {
    title,
    description
  };

  try {
    await this.prisma.todo.create({ data });
  } catch (err) {
    throw err;
  }
}
