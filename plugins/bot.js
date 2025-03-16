import fp from 'fastify-plugin';
import { Telegraf } from 'telegraf';

const domain = process.env['EXPOSED_DOMAIN']
async function plugin(fastify, opts) {
  const bot = new Telegraf(process.env['TELEGRAM_BOT_SECRET']);
  const webhook = await bot.createWebhook({ domain });
  fastify.post(`/telegraf/${bot.secretPathComponent()}`, webhook);
  fastify.decorate('bot', bot)
  fastify.addHook('onClose', async () => {
    await bot.stop('SIGINT')
  })
}

export default fp(plugin, {
  name: 'botPlugin'
});