import fp from 'fastify-plugin';

const SUBSCRIBE_ACTION = (calendarKey) => `subscribe:${calendarKey}`
async function plugin(fastify, opts) {
  const { bot, strings, subscriptions, calendars } = fastify;

  // bot.command('setup', async (ctx) => {
  //   const foundCalendars = await calendars.find();
  //   ctx.replyWithMarkdownV2(strings.it.setup, Markup.inlineKeyboard(
  //     foundCalendars.map((c) => ([Markup.button.callback(c.name, SUBSCRIBE_ACTION(c.calendarKey))]))
  //   ));
  // })

  // bot.action('subscribe', async (ctx) => {
  //   const { data, from } = ctx.callback_query;
  //   const [_, calendarKey] = data.split(':');
  //   await subscriptions.upsert(from.id, calendarKey);
  //   return ctx.replyWithMarkdownV2(strings.it.setupok.replace('\\{name\\}', 'Hello'))
  // })
}

export default fp(plugin, {
  name: 'subscribeChatPlugin',
  dependencies: ['botPlugin', 'dbInitPlugin', 'stringsPlugin', 'calendarsModelPlugin', 'subscriptionsModelPlugin']
});