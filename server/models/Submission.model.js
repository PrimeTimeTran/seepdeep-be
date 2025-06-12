import mongoose, { Schema } from 'mongoose'
import { Auditor } from './Audit/Audit'

const submissionSchema = new Schema(
  {
    body: {
      type: String,
    },
    title: {
      type: String,
    },
    explanation: {
      type: String,
    },
    language: {
      type: String,
    },
    notes: {
      type: String,
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    problem: { type: Schema.Types.ObjectId, ref: 'Problem' },
    contest: { type: Schema.Types.ObjectId, ref: 'Contest' },
    timeSubmitted: {
      type: Date,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    isShared: {
      type: Boolean,
      default: false,
    },
    isContest: {
      type: Boolean,
      default: false,
    },
    penalty: {
      type: Number,
    },
    numVotes: {
      type: Number,
    },
    numComments: {
      type: Number,
    },
    runTime: {
      type: Schema.Types.Decimal128,
    },
    beats: {
      type: Schema.Types.Decimal128,
    },
    voterIds: {
      type: Map,
      of: String,
    },
    topics: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
    runResult: {
      type: Map,
      of: String,
    },
    passing: {
      type: Schema.Types.Boolean,
    },
    testCases: {
      type: [
        {
          passing: Boolean,
          input: Schema.Types.Mixed,
          outExpected: Schema.Types.Mixed,
          outActual: Schema.Types.Mixed,
          stackTrace: String,
        },
      ],
    },
  },
  { timestamps: true }
)
Auditor.addHooks(submissionSchema)
const Submission = mongoose.model('Submission', submissionSchema)
export default Submission
export { submissionSchema, Submission }
