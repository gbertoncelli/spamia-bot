import { CronJob } from 'cron';
import fp from 'fastify-plugin';
import {fork} from 'child_process'
import process from 'process';
import path from 'path';
import { once } from 'events';

async function runCron(calendar, fastify) {
  console.log('cron running', calendar.calendarKey)
  const { subscriptions, calendars } = fastify;
  // TODO: slice subscriptions per worker
  const foundSubscriptions = (await subscriptions.findByCalendar(calendar.calendarKey)).toArray();
  const today = await calendars.today();

  if(!today.length) {
    console.log('Today no garbage collected for calendar', calendar.calendarKey, 'skipping cron')
    return;
  }

  console.log('Forking notification worker for calendar', calendar.calendarKey)
  const process = fork(path.resolve(process.cwd(),'./lib/notification-worker.mjs'));
  process.send(JSON.stringify({calendar, foundSubscriptions, today: today[0]}));
  await once(process, 'exit');
}

async function plugin(fastify, opts) {
  const { calendars } = fastify;
  const foundCalendars = await calendars.find();
  const crons = [];
  for (const calendar of foundCalendars) {
    const { calendarKey, notificationTime } = calendar;
    const [hour, minute] = notificationTime.split(':');
    const cronTime = `${minute} ${hour} * * *`
    const cron = CronJob.from({
        cronTime: '0/2 * * * *',
        onTick: runCron.bind({}, calendar, fastify),
        start: true,
        timeZone: 'Europe/Rome'
    })
    console.log(`Scheduled CRON job ${cronTime} for calendar ${calendarKey}`)
    crons.push(cron);
  }
  fastify.decorate('crons', crons);
}

export default fp(plugin, {
  name: 'cronPlugin',
  dependencies: ['dbInitPlugin', 'calendarsModelPlugin', 'subscriptionsModelPlugin']
});