import fp from 'fastify-plugin';

const COLLECTION_NAME = 'calendars';
async function plugin(fastify, opts) {
  const { db } = fastify.mongo;
  function find() {
    return db.collection(COLLECTION_NAME).find().toArray()
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
  fastify.decorate('calendars', { find, today })
}

export default fp(plugin, {
  name: 'calendarsModelPlugin',
  dependencies: ['mongoPlugin']
});