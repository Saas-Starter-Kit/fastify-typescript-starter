import { todos } from '../drizzle/schema';

export type todo = typeof todos.$inferInsert;
