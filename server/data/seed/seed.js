import mongoose from 'mongoose'

import { seedTopics } from './seedTopics.js'
import { mapProblemTopicsToIds } from './mapTopicsToProblems.js'
import { seedProblems } from './seedProblems.js'

const seedDbUri = process.env.MONGODB_URI

async function seed() {
  try {
    await mongoose.connect(seedDbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Connected to MongoDB.')
    await seedTopics()
    console.log('Seeding Topics')
    mapProblemTopicsToIds(
      './server/data/seed/jsonProblemsMaster.json',
      './server/data/seed/topicsDump.json',
      './server/data/seed/jsonProblems.json'
    )
    await seedProblems()
    console.log('Seeding Problems')
  } catch (err) {
    console.error('Seeding failed:', err)
  } finally {
    await mongoose.connection.close()
    console.log('MongoDB connection closed.')
  }
}

seed()
