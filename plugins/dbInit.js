import { parse } from 'csv-parse/sync';
import fp from 'fastify-plugin';
import fsp from 'fs/promises';
import path from 'path';

const CALENDARS_FOLDER = path.resolve(import.meta.dirname, '../data/calendars')

async function plugin(fastify, opts) {
  const calendarMap = {};

  for (const file of await fsp.readdir(CALENDARS_FOLDER, {
    withFileTypes: true
  })) {
    const isFile = file.isFile()
    if (!isFile) {
      continue;
    }

    const baseName = path.basename(file.name, path.extname(file.name))
    const text = await fsp.readFile(path.join(CALENDARS_FOLDER, file.name), 'utf-8')
    if (!calendarMap[baseName]) {
      calendarMap[baseName] = {};
    }

    if (file.name.endsWith('.json')) {
      calendarMap[baseName]['json'] = JSON.parse(text);
    } else {
      calendarMap[baseName]['csv'] = parse(text, {
        columns: true,
        relax_quotes: true,
        bom: true,
        cast: true,
        skip_empty_lines: true
      })
    }
  }

  const { db } = fastify.mongo;
  for (const key in calendarMap) {
    if (Object.prototype.hasOwnProperty.call(calendarMap, key)) {
      const { json, csv } = calendarMap[key];
      if (!json) {
        console.warn('JSON file not found for calendar', key)
        continue;
      }

      const collectionName = `calendar${key}`
      const calendarsCollectionName = `calendars`
      const found = await db.listCollections({ name: collectionName })

      if (found.length) {
        console.warn('Collection for calendar found. Skipping import', key)
        continue
      }

      await db.collection(calendarsCollectionName).insertOne({
        "calendarKey": key,
        ...json
      })

      await db.collection(collectionName).insertMany(
        csv.map(c => {
          const [day, month, year] = c.date.split('/').map(Number);
          return {
            date: new Date(year, month - 1, day, 0, 0, 0, 0),
            gc: c.gc.split('&')
          }
        }).filter(c => c.gc.length > 0)
      )

      await db.collection(collectionName).createIndex(['date'], { unique: true })
      await db.collection(collectionName).createIndex(['gc'])

      console.log('db initialized calendar', key)
    }
  }
}

export default fp(plugin, {
  name: 'dbInitPlugin',
  dependencies: ['mongoPlugin']
})