import { JSONSchemaType } from 'env-schema';
import { FastifyEnvOptions } from '@fastify/env';
import dotenv from 'dotenv';
dotenv.config();

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      ORIGIN: string;
      PORT: number;
      DATABASE_URL: string;
    };
  }
}

interface Env {
  PORT: number;
  ORIGIN: string;
  DATABASE_URL: string;
}

const schema: JSONSchemaType<Env> = {
  type: 'object',
  required: ['PORT'],
  properties: {
    ORIGIN: {
      type: 'string',
      default: '127.0.0.1'
    },
    PORT: {
      type: 'number',
      default: 4000
    },
    DATABASE_URL: {
      type: 'string'
    }
  }
};

export const options: FastifyEnvOptions = {
  dotenv: true,
  schema
};
