import mongoose from 'mongoose'
import Problem from './Problem.model.js'
import { loadJson } from '../../utils/loadJson.js'

const problems = loadJson('./server/data/seed/jsonProblems.json')

export async function seedProblems() {
  try {
    for (const problem of problems.data) {
      delete problem.author
      delete problem.editorialAuthor
      problem.topics = problem.topics.map(
        (id) => new mongoose.Types.ObjectId(id)
      )
      const p = new Problem(problem)
      await p.save()
      console.log(`Saved problem: ${p.title}`)
    }
    console.log('All problems have been created and saved to the database.')
  } catch (error) {
    console.error('Error creating problems:', error)
  } finally {
    mongoose.connection.close()
  }
}
