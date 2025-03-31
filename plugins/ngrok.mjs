import ngrok from '@ngrok/ngrok';
import fp from 'fastify-plugin';

async function plugin(fastify, opts) {
  if (process.env['NGROK_ENABLED'] !== 'true') {
    return;
  }

  const port = process.env['SERVER_PORT'] || 3000
  const client = await ngrok.forward({ authtoken_from_env: true, addr: +port });
  fastify.decorate('ngrok', client);

  fastify.addHook('onClose', async () => {
    await fastify.ngrok.close();
  })
}

export default fp(plugin, {
  name: 'ngrokPlugin',
  dependencies: ['botPlugin']
});