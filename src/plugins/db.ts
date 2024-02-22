import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { drizzle } from 'drizzle-orm/node-postgres';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import path from 'path';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { FastifyInstance } from 'fastify';
import fastifyPlugin, { PluginMetadata } from 'fastify-plugin';

// Use TypeScript module augmentation to declare the type of server.db to be Drizzle Client
declare module 'fastify' {
  interface FastifyInstance {
    db: NodePgDatabase<Record<string, never>>;
  }
}

// { schema } is used for relational queries
//import * as schema from './schema';
//export const databaseClient = drizzle(client, { schema });
async function plugin(fastify: FastifyInstance) {
  const client = new Client({
    user: process.env.DB_USERNAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    host: process.env.DB_HOST
  });

  const db = drizzle(client);

  await client.connect();

  // This command run all migrations from the migrations folder and apply changes to the database
  //await migrate(db, {
  //  migrationsFolder: path.join(__dirname, '../drizzle')
  //});

  // Make  Client available through the fastify server instance: server.db
  fastify.decorate('db', db);

  //server.addHook('onClose', async () => {
  //  await client.end();
  //});
}

//export default fastifyPlugin(plugin);
