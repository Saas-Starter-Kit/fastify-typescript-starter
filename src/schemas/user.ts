import { z } from 'zod';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { users } from '../drizzle/schema';

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);

export const GetTodosSchema = {
  response: {
    '2xx': z.array(selectUserSchema)
  }
};

export const CreateUserSchema = {
  body: insertUserSchema
};
