import { fmt } from '@grammyjs/parse-mode';
import fp from 'fastify-plugin';

async function plugin(fastify, opts) {
  const { bot } = fastify;
  const menu = fastify['menu.calendars'];

  bot.command('setup', async (ctx) => {
    ctx.replyFmt(fmt`🚀 A quale calendario vorresti sottoscriverti? Riceverai una notifica, nell'orario previsto, della tipologia del rifiuto raccolto nei giorni in cui dovrai portare la spazzatura fuori 🗑️😊`, {
      reply_markup: menu
    });
  })
}

export default fp(plugin, {
  name: 'subscribeChatPlugin',
  dependencies: ['botPlugin', 'dbInitPlugin', 'calendarsModelPlugin', 'subscriptionsModelPlugin', 'calendarsMenuPlugin']
});