import fastify from 'fastify';
import { fastifyOptions, start } from './server.js';
import 'dotenv/config';

const server = fastify(fastifyOptions);
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
server.listen({ port, host: process.env.HOST || '127.0.0.1' });
start(server, {});
