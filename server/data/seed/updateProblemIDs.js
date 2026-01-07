// import fs from 'fs'
// import mongoose from 'mongoose'
// // import Problem from '../../models/Problem.model.'

// mongoose.connect('mongodb://localhost:27017/turboship', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })

// const filePath =
//   '/Users/future/Documents/work/seepdeep/be/server/services/problems.json'

// async function updateProblemIDs() {
//   try {
//     const jsonData = fs.readFileSync(filePath, 'utf8')
//     const data = JSON.parse(jsonData)
//     for (const problem of data.data) {
//       const p = await Problem.findOne({ title: problem.title })
//       if (p) {
//         p.id = p._id.toString()
//         console.log(`Updated problem: ${p.title} with _id: ${p._id}`)
//       } else {
//         console.log(`Problem not found: ${p.title}`)
//       }
//     }
//     fs.writeFileSync(filePath, JSON.stringify(data, null, 0))
//     console.log('Problems JSON file updated successfully.')
//   } catch (error) {
//     console.error('Error updating problems JSON file:', error)
//   } finally {
//     mongoose.connection.close()
//   }
// }

// updateProblemIDs()
