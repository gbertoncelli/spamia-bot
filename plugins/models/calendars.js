import fp from 'fastify-plugin';

async function plugin(fastify, opts) {
  const { db } = fastify;
  
}

export default fp(plugin, {
  name: 'calendarsModelPlugin',
  dependencies: ['mongoPlugin']
});