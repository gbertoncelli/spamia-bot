import mongodbPlugin from '@fastify/mongodb';
import fp from 'fastify-plugin';

async function plugin(fastify, opts) {
  await fastify.register(mongodbPlugin, {
    // force to close the mongodb connection when app stopped
    // the default value is false
    forceClose: true,
    url: process.env['MONGO_URL']
  })
}

export default fp(plugin, {
  name: 'mongoPlugin'
});