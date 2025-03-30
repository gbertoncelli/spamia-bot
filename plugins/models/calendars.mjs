import fp from 'fastify-plugin';
import { today, tomorrow } from '../../lib/date.mjs';

const COLLECTION_NAME = 'calendars';
async function plugin(fastify, opts) {
  const { db } = fastify.mongo;
  function find(query) {
    return db.collection(COLLECTION_NAME).find(query).toArray()
  }
  function findByCalendarKey(calendarKey) {
    return db.collection(COLLECTION_NAME).findOne({ calendarKey });
  }
  async function getGC(day, calendarKey) {
    const collectionName = `calendar${calendarKey}`
    const result = await db.collection(collectionName).findOne({
      date: day === 'today' ? today() : tomorrow(),
      // at least 1 item not empty
      'gc.0': { $exists: true, $ne: '' }
    });
    return result;
  }
  function gcToday(calendarKey) {
    return getGC('today', calendarKey);
  }
  function gcTomorrow(calendarKey) {
    return getGC('tomorrow', calendarKey);
  }
  fastify.decorate('calendars', { find, today: gcToday, findByCalendarKey, tomorrow: gcTomorrow })
}

export default fp(plugin, {
  name: 'calendarsModelPlugin',
  dependencies: ['mongoPlugin']
});