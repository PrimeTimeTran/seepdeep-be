import mongoose from 'mongoose'
import Topic from './Topic.model.js'
import data from './problems.json' with { type: "json" };

mongoose.connect('mongodb://localhost:27017/turboship', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function createTopics(topicsData) {
  try {
    for (const topic of topicsData) {
      const t = new Topic(topic);
      await t.save();
      console.log(`Saved topic: ${t.name}`);
    }
    console.log('All topics have been created and saved to the database.');
  } catch (error) {
    console.error('Error creating topics:', error);
  } finally {
    mongoose.connection.close();
  }
}

createTopics(data.data);
