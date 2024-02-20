import { users } from '../drizzle/schema';

export type user = typeof users.$inferInsert;
