import { FastifyInstance } from 'fastify';
import swagger from '@fastify/swagger';
import fastifyPlugin, { PluginMetadata } from 'fastify-plugin';
import swaggerUi from '@fastify/swagger-ui';

const metadata: PluginMetadata = {
  name: 'swagger'
};

async function plugin(fastify: FastifyInstance) {
  await fastify.register(swagger);

  await fastify.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next();
      },
      preHandler: function (request, reply, next) {
        next();
      }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => {
      return swaggerObject;
    },
    transformSpecificationClone: true
  });

  fastify.ready((err) => {
    if (err) throw err;
    fastify.swagger();
  });
}

export default fastifyPlugin(plugin, metadata);
