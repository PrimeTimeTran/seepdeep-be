import fs from 'fs'
import path from 'path'

/**
 * Replace topic names in problems JSON with topic IDs from topics dump
 * @param {string} problemsJsonPath - path to problems JSON (input)
 * @param {string} topicsDumpPath - path to topics dump JSON
 * @param {string} outputPath - path to write updated problems JSON
 */
export function mapProblemTopicsToIds(
  problemsJsonPath,
  topicsDumpPath,
  outputPath
) {
  // Resolve absolute paths
  const problemsPath = path.resolve(problemsJsonPath)
  const topicsPath = path.resolve(topicsDumpPath)
  const outPath = path.resolve(outputPath)

  // Read JSON files
  const rawProblems = fs.readFileSync(problemsPath, 'utf8')
  const rawTopics = fs.readFileSync(topicsPath, 'utf8')

  const problemsData = JSON.parse(rawProblems)
  const topicsDump = JSON.parse(rawTopics)

  // Build map: topic name -> _id
  const topicNameToId = {}
  for (const topic of topicsDump) {
    topicNameToId[topic.name] = topic._id
  }

  // Replace topic names with IDs
  const updatedProblems = problemsData.data.map((problem) => {
    const topicIds = problem.topics
      .map((name) => {
        if (!topicNameToId[name]) {
          console.warn(`Topic name "${name}" not found in dump!`)
          return null
        }
        return topicNameToId[name]
      })
      .filter(Boolean)

    return { ...problem, topics: topicIds }
  })

  // Write updated JSON
  fs.writeFileSync(
    outPath,
    JSON.stringify({ data: updatedProblems }, null, 2),
    'utf8'
  )
  console.log(`Mapped problem topics to IDs and wrote to ${outPath}`)
}
