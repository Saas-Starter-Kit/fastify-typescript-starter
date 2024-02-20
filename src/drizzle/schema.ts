import { pgTable, varchar, text, uniqueIndex, serial } from 'drizzle-orm/pg-core';

export const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    email: text('email').notNull(),
    password: text('password').notNull()
  },
  (table) => {
    return {
      emailKey: uniqueIndex('users_email_key').on(table.email)
    };
  }
);

export const todos = pgTable('todos', {
  id: serial('id').primaryKey(),
  title: varchar('title').notNull(),
  description: varchar('description').notNull()
});
