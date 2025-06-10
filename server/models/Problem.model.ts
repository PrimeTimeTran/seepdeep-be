import { z } from 'zod'
import mongoose from 'mongoose'
import { zId } from '@zodyac/zod-mongoose'
import { Auditor } from './Audit/Audit'
import { zodToMongooseSchema } from './model.helpers'

const zSignatureParameter = z.object({
  type: z.string(),
  name: z.string(),
})

const zSignature = z.object({
  parameters: z.array(zSignatureParameter),
  returnType: z.string(),
})
const zTestCases = z.object({
  output: z.union([
    z.number(),
    z.string(),
    z.boolean(),
    z.array(z.union([z.number(), z.string(), z.boolean()])),
  ]),
  explanation: z.string(),
  input: z.union([
    z.array(z.number()),
    z.array(z.string()),
    z.number(),
    z.string(),
  ]),
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
  testCases: z.array(zTestCases),
  title: z.string(),
  topics: z.array(zId.describe('ObjectId:Topic')),
  id: z.string(),
  signature: zSignature,
  startCode: z.string().nonempty(),
})

type ProblemType = z.infer<typeof zProblem>

const problemSchemaDefinition = zodToMongooseSchema(zProblem)
const problemSchema = new mongoose.Schema(problemSchemaDefinition)
Auditor.addHooks(problemSchema)

const Problem = mongoose.model<ProblemType>('Problem', problemSchema)

export default Problem
export { problemSchema, Problem }
export type { ProblemType }
