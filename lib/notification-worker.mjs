import { bold, fmt } from "@grammyjs/parse-mode";
import { createBot } from "./bot.mjs"
import { once } from 'events'

const onMessage = async (data) => {
    const { today, subscriptions } = JSON.parse(data);
    const bot = await createBot();
    const { gc } = today;
    const msg = fmt`♻️💡 Ciao! Ti ricordo che oggi viene raccolta ${bold(gc.join(', '))} 🗑️😊`;
    for (const { chatId } of subscriptions) {
        await bot.api.sendMessage(
            chatId,
            msg.text,
            { entities: msg.entities }
        )
    }
}

async function main() {
    await new Promise((res, rej) => {
        try {
            process.on('message', async (data) => {
                await onMessage(data);
                res();
            })
        } catch (e) {
            rej(e);
        }
    })
}

main();