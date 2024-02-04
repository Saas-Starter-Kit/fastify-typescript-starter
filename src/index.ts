import fastify from 'fastify';

import AutoLoad from '@fastify/autoload';
import fastifyEnv from '@fastify/env';
import { options } from './types/envConfig';
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import path from 'path';

export const server = fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

// Add schema validator and serializer
server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

const register = async () => {
  server.register(fastifyEnv, options);

  server.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins')
  });

  server.register(AutoLoad, {
    dir: path.join(__dirname, 'routes')
  });
};

const start = async () => {
  const port = Number(process.env.PORT) || 4000;

  server.listen({ port }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
};

register();
start();
