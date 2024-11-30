import AutoLoad from '@fastify/autoload';
import * as url from 'url';
import fs from 'node:fs';
import { FastifyInstance } from 'fastify';

const httpsConfig = process.env.HTTPS_FILE_PREFIX
  ? {
      https: {
        allowHTTP1: true,
        key: fs.readFileSync(new URL('../' + process.env.HTTPS_FILE_PREFIX + '-key.pem', import.meta.url)),
        cert: fs.readFileSync(new URL('../' + process.env.HTTPS_FILE_PREFIX + '.pem', import.meta.url)),
      },
    }
  : {};

export const fastifyOptions = {
  ...httpsConfig,
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
};

export function start(fastify: FastifyInstance, pluginOptions: any) {
  fastify.register(AutoLoad, {
    dir: url.fileURLToPath(new URL('schema', import.meta.url)),
    options: pluginOptions
  });

  fastify.register(AutoLoad, {
    dir: url.fileURLToPath(new URL('plugins', import.meta.url)),
    options: pluginOptions
  });

  fastify.register(AutoLoad, {
    dir: url.fileURLToPath(new URL('routes', import.meta.url)),
    autoHooks: true,
    routeParams: true,
    options: pluginOptions
  });
}
