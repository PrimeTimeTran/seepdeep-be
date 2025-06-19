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
      default: '',
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
    numVotesUp: {
      default: 0,
      type: Number,
    },
    numVotesDown: {
      default: 0,
      type: Number,
    },
    voteIdsUp: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    voteIdsDown: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
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
    viewCount: {
      default: 0,
      type: Schema.Types.Number,
    },
    testCases: {
      type: [
        {
          passing: Boolean,
          inputs: Schema.Types.Mixed,
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
