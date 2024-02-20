import { FastifyInstance, FastifyRequest } from 'fastify';
import { todo } from '../types/todo';
import { todos } from '../drizzle/schema';

export async function GetTodos(this: FastifyInstance) {
  try {
    const todoList = await this.db.select().from(todos).limit(10);
    return todoList;
  } catch (err) {
    throw err;
  }
}

interface CreateTodoRequestI extends FastifyRequest {
  body: todo;
}

export async function CreateTodo(this: FastifyInstance, req: CreateTodoRequestI) {
  const { title, description } = req.body;

  const data: todo = {
    title,
    description
  };

  try {
    await this.db.insert(todos).values(data);
  } catch (err) {
    throw err;
  }
}
