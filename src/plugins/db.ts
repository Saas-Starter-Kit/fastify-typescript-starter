import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { drizzle } from 'drizzle-orm/node-postgres';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import path from 'path';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

// Use TypeScript module augmentation to declare the type of server.prisma to be PrismaClient
declare module 'fastify' {
  interface FastifyInstance {
    db: NodePgDatabase<Record<string, never>>;
  }
}

// { schema } is used for relational queries
//import * as schema from './schema';
//export const databaseClient = drizzle(client, { schema });

const drizzlePlugin: FastifyPluginAsync = fp(async (server) => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });

  const db = drizzle(client);

  await client.connect();

  // This command run all migrations from the migrations folder and apply changes to the database
  await migrate(db, {
    migrationsFolder: path.join(__dirname, '../drizzle')
  });

  // Make  Client available through the fastify server instance: server.db
  server.decorate('db', db);

  server.addHook('onClose', async () => {
    await client.end();
  });
});

export default drizzlePlugin;
