import { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import fastifyPlugin, { PluginMetadata } from 'fastify-plugin';

const metadata: PluginMetadata = {
  name: 'cors'
};

async function plugin(fastify: FastifyInstance) {
  //const origin = [process.env.ORIGIN || 'http://127.0.0.1:80'];

  await fastify.register(cors, {
    //origin,
    allowedHeaders: [
      'Access-Control-Allow-Origin',
      'Origin',
      'X-Requested-With',
      'Accept',
      'Content-Type',
      'Authorization'
    ],
    exposedHeaders: 'Authorization',
    credentials: true,
    methods: ['GET', 'PUT', 'OPTIONS', 'POST', 'DELETE']
  });
}

export default fastifyPlugin(plugin, metadata);
