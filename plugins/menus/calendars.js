import { Menu } from '@grammyjs/menu';
import { bold, fmt } from '@grammyjs/parse-mode';
import fp from 'fastify-plugin';

async function plugin(fastify, opts) {
  const { bot, calendars, subscriptions } = fastify;
  const foundCalendars = await calendars.find();
  const menu = new Menu('menu.calendars');

  const onSubscribe = async (calendar, ctx) => {
    const { calendarKey, name } = calendar;
    await subscriptions.upsert(ctx.chatId, calendarKey);
    return ctx.replyFmt(fmt`Ok ottimo 😉! Sei sottoscritto correttamente al calendario ${bold(name)}!🗓️📬`)
  }

  for (const calendar of foundCalendars) {
    menu.text(calendar.name, onSubscribe.bind({}, calendar))
  }

  bot.use(menu)
  fastify.decorate('menu.calendars', menu);
}

export default fp(plugin, {
  name: 'calendarsMenuPlugin',
  dependencies: ['botPlugin', 'dbInitPlugin', 'calendarsModelPlugin', 'subscriptionsModelPlugin']
});