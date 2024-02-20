import type { Config } from 'drizzle-kit';

export default {
  out: './src/drizzle/',
  schema: './src/drizzle/schema.ts',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || ''
  }
} satisfies Config;
