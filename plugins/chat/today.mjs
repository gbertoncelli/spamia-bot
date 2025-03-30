import { bold, fmt } from '@grammyjs/parse-mode';
import fp from 'fastify-plugin';



async function plugin(fastify, opts) {
    const { bot, calendars, subscriptions } = fastify;

    async function command(ctx, mode = 'today') {
        const subscription = await subscriptions.findByChatId(ctx.chatId);

        if (!subscription) {
            ctx.replyFmt(fmt`⚠️ Prima devi configurare il tuo calendario preferito con il comando /setup!`)
            return;
        }

        const calendar = await calendars.findByCalendarKey(subscription.calendarKey);

        if (!calendar) {
            ctx.replyFmt(fmt`⚠️ Non abbiamo trovato il calendario che avevi selezionato. Configurane un altro con /setup!`)
            return;
        }

        const { name, notificationTime, calendarKey } = calendar;
        const gcData = await (mode === 'today' ? calendars.today(calendarKey) : calendars.tomorrow(calendarKey));
        if (gcData) {
            const { gc } = gcData;
            ctx.replyFmt(fmt`${mode === 'today' ? 'Oggi' : 'Domani'} secondo il calendario ${bold(name)} viene raccolto ${bold(gc.join(', '))} ♻️💡.
Puoi portare fuori la spazzatura per le ${notificationTime} 😄!`)
            return;
        }

        ctx.replyFmt(fmt`👋 Tutto a posto! ${mode === 'today' ? 'Oggi' : 'Domani'} secondo il calendario ${bold(name)} non viene raccolto nulla 📭!`)
    }

    bot.command('today', async (ctx) => {
        await command(ctx);
    })

    bot.command('tomorrow', async (ctx) => {
        await command(ctx, 'tomorrow');
    })
}

export default fp(plugin, {
    name: 'startChatPlugin',
    dependencies: ['botPlugin', 'dbInitPlugin']
});