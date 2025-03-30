import { hydrateReply } from '@grammyjs/parse-mode';
import { Bot, webhookCallback } from 'grammy';

export async function createBot() {
  const token = process.env['TELEGRAM_BOT_SECRET']
  const bot = new Bot(token);
  bot.use(hydrateReply);
  return bot;
}