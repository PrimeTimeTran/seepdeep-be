import mongoose, { Schema } from 'mongoose'
import { Auditor } from './Audit/Audit'

export const userEnumerators = {
  status: {
    pending: 'pending',
    active: 'active',
    closed: 'closed',
    deactivated: 'deactivated',
    blocked: 'blocked',
  },

  role: {
    owner: 'owner',
    admin: 'admin',
    staff: 'staff',
    customer: 'customer',
  },
}
// Auto generate username
// Auto generate unique profile that stays forever.
const userSchema = new Schema(
  {
    email: {
      type: String,
    },
    passwordDigest: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    age: {
      type: Number,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    dob: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['pending', 'active', 'closed', 'deactivated', 'blocked'],
    },
    username: {
      type: String,
    },
    urlAvatar: {
      type: String,
    },
    urlPaypal: {
      type: String,
    },
    urlGithub: {
      type: String,
    },
    urlLinkedIn: {
      type: String,
    },
    urlPortfolio: {
      type: String,
    },
    urlCSProfile: {
      type: String,
    },
    urlSites: {
      type: String,
    },
    views: {
      type: Number,
    },
    discuss: {
      type: Number,
    },
    solutions: {
      type: Number,
    },
    reputation: {
      type: Number,
    },
    contestRating: {
      type: Number,
    },
    globalRanking: {
      type: Number,
    },
    attended: {
      type: Number,
    },
    startYear: {
      type: Number,
    },
    numSubmissions: {
      type: Number,
    },
    numAcceptedProblems: {
      type: Number,
    },
    numSubmittedProblems: {
      type: Number,
    },
    numAcceptedSubmissions: {
      type: Number,
    },
    gender: {
      type: String,
    },
    top: {
      type: Schema.Types.Decimal128,
    },
    submissions: [{ type: Schema.Types.ObjectId, ref: 'Submission' }],
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    contests: [{ type: Schema.Types.ObjectId, ref: 'Contest' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    articles: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
    problems: [{ type: Schema.Types.ObjectId, ref: 'Problem' }],
    solves: [{ type: Schema.Types.ObjectId, ref: 'Solve' }],
    meta: {
      type: Map,
      of: String,
    },
    badges: [{ type: Schema.Types.ObjectId, ref: 'Badge' }],
    role: {
      type: [String],
      enum: ['owner', 'admin', 'staff', 'customer'],
    },
    streak: {
      type: Map,
      of: Schema.Types.Mixed,
      default: {},
      // of: {
      //   dayTotal: Number,
      //   problems: problemsSchema, // Problems map containing nested language maps
      // },
    },
    totalLifetime: Number,
    currentStreak: Number,
    maxStreak: Number,
    languages: {
      type: Map,
      of: String,
    },
  },
  { timestamps: true, strict: false }
)
Auditor.addHooks(userSchema)
const User = mongoose.model('User', userSchema)
export default User
export { userSchema, User }
