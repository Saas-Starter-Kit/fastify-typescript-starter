import { FastifyInstance } from 'fastify';
import helmet from '@fastify/helmet';
import fastifyPlugin, { PluginMetadata } from 'fastify-plugin';

const metadata: PluginMetadata = {
  name: 'helmet'
};

async function plugin(fastify: FastifyInstance) {
  await fastify.register(helmet, { global: true });
}

export default fastifyPlugin(plugin, metadata);
