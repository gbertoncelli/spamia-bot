import fp from 'fastify-plugin';

const COLLECTION_NAME = 'calendars';
async function plugin(fastify, opts) {
  const { db } = fastify.mongo;
  function find() {
    return db.collection(COLLECTION_NAME).find().toArray()
  }
  fastify.decorate('calendars', { find })
}

export default fp(plugin, {
  name: 'calendarsModelPlugin',
  dependencies: ['mongoPlugin']
});