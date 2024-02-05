import { z } from 'zod';
import { UserSchema } from '../types/zod-db-models';

export const UserCreateSchema = UserSchema.omit({ id: true });
export type UserCreateT = z.infer<typeof UserCreateSchema>;
