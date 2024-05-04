import { z } from 'zod'
import mongoose, { Schema } from 'mongoose'
import { Auditor } from './Audit/Audit'

const zSignatureParameter = z.object({
  type: z.string(),
  name: z.string(),
})

const zSignature = z.object({
  parameters: z.array(zSignatureParameter),
  returnType: z.string(),
})

const zTestSuite = z.object({
  output: z.array(z.number()),
  explanation: z.string(),
  input: z.tuple([z.array(z.number()), z.number()]),
})

const zTopic = z.object({
  name: z.string(),
})

const zEditorialVotes = z.record(z.number())

const zSimilar = z.object({
  difficulty: z.string(),
  id: z.number(),
  title: z.string(),
})

const zAuthor = z.object({
  urlAvatar: z.string(),
  username: z.string(),
})

const zProblem = z.object({
  acceptanceRate: z.number(),
  accepted: z.number(),
  author: zAuthor,
  body: z.string(),
  constraints: z.array(z.unknown()),
  difficulty: z.string(),
  editorialAuthor: zAuthor,
  editorialBody: z.string(),
  editorialRating: z.number(),
  editorialVotes: zEditorialVotes,
  frequency: z.string(),
  hints: z.array(z.unknown()),
  isPublished: z.boolean(),
  isSubmitted: z.boolean(),
  numLC: z.number(),
  similar: z.array(zSimilar),
  submissions: z.number(),
  testSuite: z.array(zTestSuite),
  title: z.string(),
  topics: z.array(zTopic),
  id: z.string(),
  signature: zSignature,
  startCode: z.string().nonempty(),
})

type ProblemType = z.infer<typeof zProblem>

const problemSchema = zodToMongooseSchema(zProblem)
const Problem = new mongoose.Schema(problemSchema)
export default Problem
export { problemSchema, Problem }
export type { ProblemType }
