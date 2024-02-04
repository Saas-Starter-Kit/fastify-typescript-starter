import { FastifyInstance } from 'fastify';
import rateLimit from '@fastify/rate-limit';
import fastifyPlugin, { PluginMetadata } from 'fastify-plugin';

const metadata: PluginMetadata = {
  name: 'rate limit'
};

async function plugin(fastify: FastifyInstance) {
  await fastify.register(rateLimit, { max: 100, timeWindow: '1 minute' });
}

export default fastifyPlugin(plugin, metadata);
