import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import Problem from '../models/Problem.model.js';

import data from './problems.json' with { type: "json" };

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/turboship', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const filePath = '/Users/future/Documents/Work/seepdeep-be/server/services/problems.json'
async function updateProblemsJson() {
    try {
        // Read the JSON file and parse it
        const jsonData = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(jsonData);

        // Iterate through each problem in the data array
        for (const problemData of data.data) {
            // Query the database for the corresponding problem
            const problem = await Problem.findOne({ title: problemData.title });

            // If the problem is found in the database
            if (problem) {
                // Replace the "id" field with the MongoDB `_id`
                problemData.id = problem._id.toString();
                console.log(`Updated problem: ${problemData.title} with _id: ${problem._id}`);
            } else {
                console.log(`Problem not found: ${problemData.title}`);
            }
        }

        // Save the updated data back to the JSON file
        // const jsonData = JSON.stringify(data, null, 0)
        fs.writeFileSync(filePath, JSON.stringify(data, null, 0));
        console.log('Problems JSON file updated successfully.');
    } catch (error) {
        console.error('Error updating problems JSON file:', error);
    } finally {
        // Close the MongoDB connection
        mongoose.connection.close();
    }
}

// Run the function to update the JSON file
updateProblemsJson();
