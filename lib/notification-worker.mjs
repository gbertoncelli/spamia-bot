import { bold, fmt } from "@grammyjs/parse-mode";
import { createBot } from "./bot.mjs"
import {once} from 'events'

const onMessage = async (data) => {
    const {calendar, today, subscriptions} = JSON.parse(data);
    const bot = await createBot();
    const { gc } = today;
    for (const { chatId } of subscriptions) {
        await bot.api.sendMessage(
            chatId,
            fmt`Ciao! Ti ricordo che oggi viene raccolta ${bold(gc.split('&', ' e ').toUpperCase())} 🗑️😊`
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