import mongoose, { Schema } from 'mongoose';
import { Auditor } from './Audit/Audit';

export const submissionEnumerators = {};

const submissionSchema = new Schema({
  body: {
    type: String
  },
  title: {
    type: String
  },
  explanation: {
    type: String
  },
  language: {
    type: String
  },
  notes: {
    type: String
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  problem: { type: Schema.Types.ObjectId, ref: 'Problem' },
  contest: { type: Schema.Types.ObjectId, ref: 'Contest' },
  timeSubmitted: {
    type: Date
  },
  isPublished: {
    type: Boolean
  },
  isShared: {
    type: Boolean
  },
  isContest: {
    type: Boolean
  },
  penalty: {
    type: Number
  },
  numVotes: {
    type: Number
  },
  numComments: {
    type: Number
  },
  runTime: {
    type: Schema.Types.Decimal128
  },
  beats: {
    type: Schema.Types.Decimal128
  },
  voterIds: {
    type: Map,
    of: String
  },
  topics: [{ type: Schema.Types.ObjectId, ref: 'Topic' }]
});
Auditor.addHooks(submissionSchema);
const Submission = mongoose.model('Submission', submissionSchema);
export default Submission;
export { submissionSchema, Submission };
