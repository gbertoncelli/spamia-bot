import fp from 'fastify-plugin';
const COLLECTION_NAME = 'subscriptions';
async function plugin(fastify, opts) {
  const { db } = fastify.mongo;
  const collection = db.collection(COLLECTION_NAME);

  async function upsert(chatId, calendarKey) {
    const document = await collection.findOneAndUpdate({
      chatId
    }, {
      $set: {
        chatId,
        calendarKey
      }
    }, {
      upsert: true,
      returnDocument: 'after'
    })
    return document;
  }

  async function remove(chatId) {
    await collection.deleteOne({ chatId })
  }

  fastify.decorate('subscriptions', { upsert, remove })
}

export default fp(plugin, {
  name: 'subscriptionsModelPlugin',
  dependencies: ['mongoPlugin']
});