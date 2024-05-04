import mongoose from 'mongoose'
import Problem from '../models/Problem.model.js'
import data from './problems.json' with { type: "json" };

mongoose.connect('mongodb://localhost:27017/turboship', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
async function createProblems(problemsData) {
  try {
    for (const problemData of problemsData) {
      delete problemData.editorialAuthor
      delete problemData.author
      const problem = new Problem(problemData);
      await problem.save();
      console.log(`Saved problem: ${problem.title}`);
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
