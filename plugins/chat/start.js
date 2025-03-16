import fp from 'fastify-plugin';

async function plugin(fastify, opts) {
  const { bot, strings } = fastify;
  bot.start((ctx) => ctx.replyWithMarkdownV2(strings.it.welcome))
}

export default fp(plugin, {
  name: 'startChatPlugin',
  dependencies: ['botPlugin', 'dbInitPlugin', 'stringsPlugin']
});