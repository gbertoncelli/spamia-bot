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
  await fastify.listen({
    port,
    host: process.env['EXPOSE_SERVER'] == 'true' ? '0.0.0.0' : '127.0.0.1'
  })
  console.log("Listening on port", port);


  const token = process.env['TELEGRAM_BOT_SECRET']
  const secret = process.env['TELEGRAM_API_SECRET']
  const ngrokEnabled = process.env['NGROK_ENABLED'] === 'true'
  const exposedEndpoint = process.env['TELEGRAM_HOST'];
  const { bot, ngrok } = fastify;
  const exposed = ngrokEnabled && ngrok ? ngrok.url() : exposedEndpoint;
  await bot.api.setWebhook(`${exposed}/${token}`, { secret_token: secret });
  console.log('Forwarding on', exposed)
}
main()