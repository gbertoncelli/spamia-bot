import fp from 'fastify-plugin';

import { mapValues } from 'es-toolkit';
import it from '../data/strings/it.json' with { type: "json" };

async function plugin(fastify, opts) {
  const itParsed = mapValues(it, (s) => s.replace(/([|{\[\]_~}+)(#>!=\-.])/gm, '\\$1'))
  fastify.decorate('strings', {
    it: itParsed
  })
}

export default fp(plugin, {
  name: 'stringsPlugin'
});