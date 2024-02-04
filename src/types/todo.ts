import { z } from 'zod';
import { TodoSchema } from '../types/zod-db-models';

export const TodoCreateSchema = TodoSchema.omit({ id: true });
export type TodoCreateT = z.infer<typeof TodoCreateSchema>;
