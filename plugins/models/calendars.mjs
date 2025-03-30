import fp from 'fastify-plugin';

const COLLECTION_NAME = 'calendars';
async function plugin(fastify, opts) {
  const { db } = fastify.mongo;
  function find() {
    return db.collection(COLLECTION_NAME).find().toArray()
  }
  function today(calendarKey) {
    const collectionName = `calendar${key}`
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return db.collection(collectionName).find({
      date: today
    }).toArray();
  }
  fastify.decorate('calendars', { find, today })
}

export default fp(plugin, {
  name: 'calendarsModelPlugin',
  dependencies: ['mongoPlugin']
});