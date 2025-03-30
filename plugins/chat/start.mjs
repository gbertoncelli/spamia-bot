import { bold, fmt } from '@grammyjs/parse-mode';
import fp from 'fastify-plugin';

async function plugin(fastify, opts) {
  const { bot } = fastify;
  bot.command('start', (ctx) => ctx.replyFmt(
    fmt`🤖 Bip bop, ciao! 🔥
Sono ${bold("SPAMIA Bot")}, il bot telegram autonomo che può assisterti nella raccolta differenziata porta a porta!🗑️🚪
Ad oggi il servizio è attivo nelle seguenti località:
  - Verona EST (VR)
Per configurarmi esegui il comando /setup}!`
  ))
}

export default fp(plugin, {
  name: 'startChatPlugin',
  dependencies: ['botPlugin', 'dbInitPlugin']
});