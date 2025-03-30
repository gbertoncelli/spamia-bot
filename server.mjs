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


  const token = process.env['TELEGRAM_BOT_SECRET']
  const secret = process.env['TELEGRAM_API_SECRET']
  const { bot, ngrok } = fastify;
  await bot.api.setWebhook(`${ngrok.url()}/${token}`, { secret_token: secret });
  console.log('Forwarding on', ngrok.url())
}
main()