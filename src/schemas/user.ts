import { z } from 'zod';
import { TodoSchema } from '../types/zod-db-models';
import { UserCreateSchema } from '../types/user';

export const GetTodosSchema = {
  response: {
    '2xx': z.array(TodoSchema)
  }
};

export const CreateUserSchema = {
  body: UserCreateSchema
};
