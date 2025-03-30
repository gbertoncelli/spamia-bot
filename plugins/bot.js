import { hydrateReply } from '@grammyjs/parse-mode';
import fp from 'fastify-plugin';
import { Bot, webhookCallback } from 'grammy';
import { createBot } from '../lib/bot';

async function plugin(fastify, opts) {
  const bot = await createBot();
  fastify.post(`/${token}`, webhookCallback(bot, 'fastify', {
    secretToken: secret
  }));

  fastify.decorate('bot', bot)
  fastify.addHook('onClose', async () => {
    await bot.stop()
  })
}

export default fp(plugin, {
  name: 'botPlugin'
});