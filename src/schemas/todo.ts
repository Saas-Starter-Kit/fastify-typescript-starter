import { z } from 'zod';
import { TodoSchema } from '../types/zod-db-models';
import { TodoCreateSchema } from '../types/todo';

export const GetTodosSchema = {
  response: {
    '2xx': z.array(TodoSchema)
  }
};

export const CreateTodoSchema = {
  body: TodoCreateSchema
};
