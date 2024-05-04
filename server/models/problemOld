import mongoose, { Schema } from 'mongoose'

const problemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  frequency: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  isPublished: {
    type: Boolean,
    required: true,
  },
  isSubmitted: {
    type: Boolean,
    required: true,
  },
  numLC: {
    type: Number,
    required: true,
  },
  voterIds: {
    type: Map,
    of: String,
  },
  editorialAuthor: { type: Schema.Types.ObjectId, ref: 'User' },
  editorialBody: {
    type: String,
  },
  editorialRating: {
    type: Schema.Types.Decimal128,
    required: true,
  },
  editorialVotes: {
    type: Map,
    required: true,
  },
  accepted: {
    type: Schema.Types.Decimal128,
    required: true,
  },
  submissions: {
    type: Schema.Types.Decimal128,
    required: true,
  },
  acceptanceRate: {
    type: Schema.Types.Decimal128,
    required: true,
  },
  testCases: {
    type: [
      {
        output: [Number | String],
        explanation: String,
        input: {
          type: [Schema.Types.Mixed],
          required: true,
      },
      },
    ],
    required: true,
  },
  topics: [{ name: String }],
  hints: {
    type: [String],
    default: [],
    required: true,
  },
  constraints: {
    type: [String],
    default: [],
    required: true,
  },
  startCode: {
    type: String,
  },
  similar: [
    {
      difficulty: { type: String },
      id: { type: Number },
      title: { type: String },
    },
  ],
  signature: {
    parameters: [
      {
        type: { type: String, required: true },
        name: { type: String, required: true },
      },
    ],
    returnType: { type: String, required: true },
  },
})

const Problem = mongoose.model('Problem', problemSchema)

export default Problem
export { problemSchema, Problem }
