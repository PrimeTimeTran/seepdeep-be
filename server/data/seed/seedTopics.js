import mongoose from 'mongoose'
import fs from 'fs'
import path from 'path'

import Topic from './Topic.model.js'
import { loadJson } from '../../utils/loadJson.js'

const topics = loadJson('./server/data/seed/jsonTopics.json')

export async function seedTopics() {
  try {
    const savedTopics = []

    for (const topic of topics.data) {
      const t = new Topic(topic)
      await t.save()
      console.log(`Saved topic: ${t.name}`)

      savedTopics.push({ _id: t._id.toString(), name: t.name })
    }

    console.log('All topics have been created and saved to the database.')

    const outputPath = path.resolve('./server/data/seed/topicsDump.json')
    fs.writeFileSync(outputPath, JSON.stringify(savedTopics, null, 2), 'utf8')
    console.log(`Dumped topics to ${outputPath}`)
  } catch (error) {
    console.error('Error creating topics:', error)
  } finally {
    mongoose.connection.close()
  }
}
