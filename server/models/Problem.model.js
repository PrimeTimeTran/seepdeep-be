import mongoose, { Schema } from 'mongoose';
import { Auditor } from './Audit/Audit';

export const problemEnumerators = {};

const problemSchema = new Schema({
  title: {
    type: String
  },
  body: {
    type: String
  },
  frequency: {
    type: String
  },
  difficulty: {
    type: String
  },
  author: { type: Schema.Types.ObjectId, ref: 'Author' },
  isPublished: {
    type: Boolean
  },
  isSubmitted: {
    type: Boolean
  },
  numLC: {
    type: BigInt
  },
  voterIds: {
    type: Map,
    of: String
  },
  editorialAuthor: { type: Schema.Types.ObjectId, ref: 'EditorialAuthor' },
  editorialBody: {
    type: String
  },
  editorialRating: {
    type: Schema.Types.Decimal128
  },
  editorialVotes: {
    type: BigInt
  },
  accepted: {
    type: Schema.Types.Decimal128
  },
  submissions: {
    type: Schema.Types.Decimal128
  },
  acceptanceRate: {
    type: Schema.Types.Decimal128
  },
  testSuite: {
    type: []
  },
  topics: [{ type: Schema.Types.ObjectId, ref: 'Topics' }],
  hints: {
    type: []
  },
  constraints: {
    type: []
  }
});
Auditor.addHooks(problemSchema);
const Problem = mongoose.model('Problem', problemSchema);
export default Problem;
export { problemSchema };
