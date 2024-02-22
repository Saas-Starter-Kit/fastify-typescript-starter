import type { Config } from 'drizzle-kit';

export default {
  out: './src/drizzle/',
  schema: './src/drizzle/schema.ts',
  driver: 'pg',
  dbCredentials: {
    host: process.env.DB_HOST || '',
    database: process.env.DB_NAME || '',
    user: process.env.DB_USERNAME || '',
    port: Number(process.env.DB_PORT) || 5432,
    password: process.env.DB_PASSWORD || ''
  }
} satisfies Config;
