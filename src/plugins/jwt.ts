import { FastifyInstance } from 'fastify';
import jwt from '@fastify/jwt';
import fastifyPlugin, { PluginMetadata } from 'fastify-plugin';

const metadata: PluginMetadata = {
  name: 'jwt'
};

async function plugin(fastify: FastifyInstance) {
  await fastify.register(jwt, { secret: fastify.config.AUTH_SECRET });
}

export default fastifyPlugin(plugin, metadata);
