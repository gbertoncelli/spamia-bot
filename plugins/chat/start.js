import fp from 'fastify-plugin';

async function plugin(fastify, opts) {
  const { bot, strings } = fastify;
  bot.command('start', (ctx) => ctx.reply(
    strings.it.welcome, {
    parse_mode: "MarkdownV2"
  }))
}

export default fp(plugin, {
  name: 'startChatPlugin',
  dependencies: ['botPlugin', 'dbInitPlugin', 'stringsPlugin']
});