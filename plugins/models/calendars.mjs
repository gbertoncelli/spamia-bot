import fp from 'fastify-plugin';
import { addDays } from 'date-fns'

const COLLECTION_NAME = 'calendars';
async function plugin(fastify, opts) {
  const { db } = fastify.mongo;
  function find(query) {
    return db.collection(COLLECTION_NAME).find(query).toArray()
  }
  function findByCalendarKey(calendarKey) {
    return db.collection(COLLECTION_NAME).findOne({ calendarKey });
  }
  async function today(calendarKey) {
    const collectionName = `calendar${calendarKey}`
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const result = await db.collection(collectionName).findOne({
      date: today,
      // at least 1 item
      'gc.0': { $exists: true, $ne: '' }
    });
    return result;
  }
  async function tomorrow(calendarKey) {
    const collectionName = `calendar${calendarKey}`
    let tomorrow = new Date();
    tomorrow.setHours(0, 0, 0, 0);
    tomorrow = addDays(tomorrow, 1)
    const result = await db.collection(collectionName).findOne({
      date: tomorrow,
      // at least 1 item
      'gc.0': { $exists: true, $ne: '' }
    });
    return result;
  }
  fastify.decorate('calendars', { find, today, findByCalendarKey, tomorrow })
}

export default fp(plugin, {
  name: 'calendarsModelPlugin',
  dependencies: ['mongoPlugin']
});