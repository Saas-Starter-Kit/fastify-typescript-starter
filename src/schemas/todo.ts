import { z } from 'zod';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { todos } from '../drizzle/schema';

export const insertTodoSchema = createInsertSchema(todos);
export const selectTodoSchema = createSelectSchema(todos);

export const GetTodosSchema = {
  response: {
    '2xx': z.array(selectTodoSchema)
  }
};

export const CreateTodoSchema = {
  body: insertTodoSchema
};
