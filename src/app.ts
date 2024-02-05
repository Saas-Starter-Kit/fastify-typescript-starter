import fastify from 'fastify';

import AutoLoad from '@fastify/autoload';
import fastifyEnv from '@fastify/env';
import { options } from './types/envConfig';
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import path from 'path';

export function build() {
  const app = fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

  // Add schema validator and serializer
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.register(fastifyEnv, options);

  app.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins')
  });

  app.register(AutoLoad, {
    dir: path.join(__dirname, 'routes')
  });

  return app;
}
