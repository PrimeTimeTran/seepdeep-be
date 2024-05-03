import { z, ZodTypeDef } from 'zod';
import mongoose, { Schema, model } from 'mongoose'
import { zId, zUUID, zodSchema } from '@zodyac/zod-mongoose';

import { Auditor } from './Audit/Audit'

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
);

const streakSchema = z.map(
  z.string(),
  z.object({
    dayTotal: z.number(), 
    problems: problemsSchema,
  })
);

const zUser = z.object({
  // _id: z.objectI,
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
  // status: z.enum(Object.values(userEnumerators.status)),
  createdAt: z.date(),
  updatedAt: z.date(),
});

type StreakType = z.infer<typeof streakSchema>;
type UserType = z.infer<typeof zUser> & mongoose.Document & {
  markModified: (path: string) => void;
};

const userSchemaDefinition = zodToMongooseSchema(zUser);
const userSchema = new mongoose.Schema(userSchemaDefinition);

Auditor.addHooks(userSchema)
const User = mongoose.model<UserType>('User', userSchema)
export default User
export { userSchema, User }
export type { UserType, StreakType }


// const userSchema = zodSchema(zUser);
// const User = model('User', userSchema);
// type UserType = z.infer<typeof zUser>;
// type UserType = z.infer<typeof zUser>;
// export type { UserType }


// Auto generate username
// Auto generate unique profile that stays forever.
// const userSchema = new Schema(
//   {
//     _id: {
//       type: mongoose.Types.ObjectId,
//     },
//     email: {
//       type: String,
//     },
//     passwordDigest: {
//       type: String,
//     },
//     firstName: {
//       type: String,
//     },
//     lastName: {
//       type: String,
//     },
//     age: {
//       type: Number,
//     },
//     city: {
//       type: String,
//     },
//     country: {
//       type: String,
//     },
//     dob: {
//       type: Date,
//     },
//     status: {
//       type: String,
//       enum: ['pending', 'active', 'closed', 'deactivated', 'blocked'],
//     },
//     username: {
//       type: String,
//     },
//     urlAvatar: {
//       type: String,
//     },
//     urlPaypal: {
//       type: String,
//     },
//     urlGithub: {
//       type: String,
//     },
//     urlLinkedIn: {
//       type: String,
//     },
//     urlPortfolio: {
//       type: String,
//     },
//     urlCSProfile: {
//       type: String,
//     },
//     urlSites: {
//       type: String,
//     },
//     views: {
//       type: Number,
//     },
//     discuss: {
//       type: Number,
//     },
//     solutions: {
//       type: Number,
//     },
//     reputation: {
//       type: Number,
//     },
//     contestRating: {
//       type: Number,
//     },
//     globalRanking: {
//       type: Number,
//     },
//     attended: {
//       type: Number,
//     },
//     startYear: {
//       type: Number,
//     },
//     numSubmissions: {
//       type: Number,
//     },
//     numAcceptedProblems: {
//       type: Number,
//     },
//     numSubmittedProblems: {
//       type: Number,
//     },
//     numAcceptedSubmissions: {
//       type: Number,
//     },
//     gender: {
//       type: String,
//     },
//     top: {
//       type: Schema.Types.Decimal128,
//     },
//     streak: {
//       type: Map,
//       of: Schema.Types.Mixed,
//       default: {},
//     },
//     totalLifetime: Number,
//     currentStreak: Number,
//     maxStreak: Number,
//     // Todo:
//     submissions: [{ type: Schema.Types.ObjectId, ref: 'Submission' }],
//     posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
//     contests: [{ type: Schema.Types.ObjectId, ref: 'Contest' }],
//     comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
//     articles: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
//     problems: [{ type: Schema.Types.ObjectId, ref: 'Problem' }],
//     solves: [{ type: Schema.Types.ObjectId, ref: 'Solve' }],
//     meta: {
//       type: Map,
//       of: String,
//     },
//     badges: [{ type: Schema.Types.ObjectId, ref: 'Badge' }],
//     roles: {
//       type: [String],
//       enum: ['owner', 'admin', 'staff', 'customer'],
//     },
    
//     languages: {
//       type: Map,
//       of: String,
//     },
//   },
//   { timestamps: true, strict: false }
// )




function zodToMongooseSchema(zodSchema) {
  const mongooseSchemaDefinition = {};

  // Iterate through each key in the Zod schema
  for (const key in zodSchema.shape) {
    const zodType = zodSchema.shape[key];

    // Convert Zod type to Mongoose schema type
    if (zodType instanceof z.ZodString) {
      mongooseSchemaDefinition[key] = { type: String, required: !zodType.isOptional() };
    } else if (zodType instanceof z.ZodNumber) {
      mongooseSchemaDefinition[key] = { type: Number, required: !zodType.isOptional() };
    } else if (zodType instanceof z.ZodDate) {
      mongooseSchemaDefinition[key] = { type: Date, required: !zodType.isOptional() };
    } else if (zodType instanceof z.ZodBoolean) {
      mongooseSchemaDefinition[key] = { type: Boolean, required: !zodType.isOptional() };
    } else if (zodType instanceof z.ZodArray) {
      const itemType = zodToMongooseSchema(z.object({ item: zodType.element }));
      mongooseSchemaDefinition[key] = { type: [itemType.item], required: !zodType.isOptional() };
    } else if (zodType instanceof z.ZodObject) {
      mongooseSchemaDefinition[key] = zodToMongooseSchema(zodType);
    } else if (zodType instanceof z.ZodOptional) {
      // Handle optional types recursively
      mongooseSchemaDefinition[key] = { type: zodToMongooseSchema(zodType.unwrap()), required: false };
    }
    // Add more Zod type conversions as needed
  }

  return mongooseSchemaDefinition;
}