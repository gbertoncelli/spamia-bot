import { config } from 'dotenv';
config()

import fastifyAutoload from '@fastify/autoload';
import { fastify as Fastify } from "fastify";
import path from 'path';


async function main() {
  const fastify = Fastify();

  await fastify.register(
    fastifyAutoload,
    { dir: path.join(import.meta.dirname, 'plugins') }
  )

  const port = process.env['SERVER_PORT'] || 3000
  await fastify.listen({ port })
  console.log("Listening on port", port);
}
main()