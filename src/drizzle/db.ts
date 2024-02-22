import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client, Pool } from 'pg';

const client = new Pool({
  user: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  host: process.env.DB_HOST
});

export const db = drizzle(client);
