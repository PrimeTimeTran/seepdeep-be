import mongoose from 'mongoose'
import Problem from '../models/Problem.model.js'
import data from '../services/problems.json' with { type: "json" };

mongoose.connect('mongodb://localhost:27017/turboship', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function createProblems(data) {
  try {
    for (const problem of data) {
      delete problem.author
      delete problem.editorialAuthor
      const p = new Problem(problem);
      await p.save();
      console.log(`Saved problem: ${p.title}`);
    }
    console.log('All problems have been created and saved to the database.');
  } catch (error) {
    console.error('Error creating problems:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the function to create problems
createProblems(data.data);
