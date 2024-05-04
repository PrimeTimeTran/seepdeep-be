import { z } from 'zod'
import mongoose from 'mongoose'
import { zId } from '@zodyac/zod-mongoose'

import { Auditor } from './Audit/Audit'
import { zodToMongooseSchema } from './model.helpers'

export const userEnumerators = {
  status: {
    pending: 'pending',
    active: 'active',
    closed: 'closed',
    deactivated: 'deactivated',
    blocked: 'blocked',
  },
  roles: {
    owner: 'owner',
    admin: 'admin',
    staff: 'staff',
    customer: 'customer',
  },
}

const problemsSchema = z.map(
  z.string(),
  z.object({
    dayTotal: z.number(),
    languages: z.map(z.string(), z.number()),
  })
)

const streakSchema = z.map(
  z.string(),
  z.object({
    dayTotal: z.number(),
    problems: problemsSchema,
  })
)

const zUser = z.object({
  email: z.string(),
  passwordDigest: z.string(),
  username: z.optional(z.string()),
  firstName: z.optional(z.string()),
  lastName: z.optional(z.string()),
  age: z.optional(z.number()),
  city: z.optional(z.string()),
  country: z.optional(z.string()),
  dob: z.optional(z.date()),
  urlAvatar: z.optional(z.string()),
  urlPaypal: z.optional(z.string()),
  urlGithub: z.optional(z.string()),
  urlLinkedIn: z.optional(z.string()),
  urlPortfolio: z.optional(z.string()),
  urlCSProfile: z.optional(z.string()),
  urlSites: z.optional(z.string()),
  views: z.optional(z.number()),
  discuss: z.optional(z.number()),
  solutions: z.optional(z.number()),
  reputation: z.optional(z.number()),
  contestRating: z.optional(z.number()),
  globalRanking: z.optional(z.number()),
  attended: z.optional(z.number()),
  startYear: z.optional(z.number()),
  numSubmissions: z.optional(z.number()),
  numAcceptedProblems: z.optional(z.number()),
  numbSubmittedProblems: z.optional(z.number()),
  numbAcceptedSubmissions: z.optional(z.number()),
  gender: z.optional(z.string()),
  top: z.optional(z.number()),
  totalLifetime: z.number(),
  currentStreak: z.number(),
  maxStreak: z.number(),
  // 05/03/24 -> problems -> 325eb55b0eeca014fcededbe -> python -> int
  streak: streakSchema,
  submissions: z.array(zId.describe('ObjectId:Submission')),
  posts: z.array(zId.describe('ObjectId:Post')),
  contests: z.array(zId.describe('ObjectId:Contest')),
  comments: z.array(zId.describe('ObjectId:Comment')),
  articles: z.array(zId.describe('ObjectId:Article')),
  problems: z.array(zId.describe('ObjectId:Problem')),
  solves: z.array(zId.describe('ObjectId:Solve')),
  roles: z.array(zId.describe('ObjectId:Role')),
  createdAt: z.date(),
  updatedAt: z.date(),
})

type StreakType = z.infer<typeof streakSchema>

type UserType = z.infer<typeof zUser> &
  mongoose.Document & {
    markModified: (path: string) => void
  }

const userSchemaDefinition = zodToMongooseSchema(zUser)
const userSchema = new mongoose.Schema(userSchemaDefinition)

Auditor.addHooks(userSchema)
const User = mongoose.model<UserType>('User', userSchema)
export default User
export { userSchema, User }
export type { UserType, StreakType }
