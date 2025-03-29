import { hydrateReply } from '@grammyjs/parse-mode';
import fp from 'fastify-plugin';
import { Bot, webhookCallback } from 'grammy';

async function plugin(fastify, opts) {
  const token = process.env['TELEGRAM_BOT_SECRET']
  const secret = process.env['TELEGRAM_API_SECRET']
  const bot = new Bot(token);

  bot.use(hydrateReply);

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