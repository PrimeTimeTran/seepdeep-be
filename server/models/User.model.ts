import { z } from 'zod'
import mongoose from 'mongoose'
import { zId } from '@zodyac/zod-mongoose'

import { Auditor } from './Audit/Audit'
import { zodToMongooseSchema } from './model.helpers'
import Submission from './Submission.model.js'

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
  views: z.optional(z.number()).default(0),
  points: z.optional(z.number()).default(0),
  discuss: z.optional(z.number()),
  solutions: z.optional(z.number()),
  reputation: z.optional(z.number()).default(0),
  contestRating: z.optional(z.number()).default(0),
  globalRanking: z.optional(z.number()).default(0),
  attended: z.optional(z.number()),
  startYear: z.optional(z.number()),
  numSubmissions: z.optional(z.number()),
  numAcceptedProblems: z.optional(z.number()),
  numbSubmittedProblems: z.optional(z.number()),
  numbAcceptedSubmissions: z.optional(z.number()),
  gender: z.optional(z.string()),
  top: z.optional(z.number()),
  totalLifetime: z.number().default(0),
  currentStreak: z.number().default(0),
  maxStreak: z.number().default(0),
  streak: streakSchema,
  createdAt: z.date().transform((value: any) => value || new Date()),
  updatedAt: z.date().transform((value: any) => value || new Date()),
  posts: z.array(zId('Post')),
  roles: z.array(zId('Role')),
  solves: z.array(zId('Solve')),
  contests: z.array(zId('Contest')),
  comments: z.array(zId('Comment')),
  articles: z.array(zId('Article')),
  problems: z.array(zId('Problem')),
  submissions: z.array(zId('Submission')),
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
