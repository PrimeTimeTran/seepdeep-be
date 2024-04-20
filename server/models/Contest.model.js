import mongoose, { Schema } from 'mongoose';
import { Auditor } from './Audit/Audit';

export const contestEnumerators = {};

const contestSchema = new Schema({
  name: {
    type: String
  },
  body: {
    type: String
  },
  title: {
    type: String
  },
  company: { type: Schema.Types.ObjectId, ref: 'Company' },
  sponsor: { type: Schema.Types.ObjectId, ref: 'Sponsor' },
  timeStart: {
    type: Date
  },
  timeEnd: {
    type: Date
  },
  problem: [{ type: Schema.Types.ObjectId, ref: 'Problem' }],
  submissions: [{ type: Schema.Types.ObjectId, ref: 'Submissions' }],
  users: [{ type: Schema.Types.ObjectId, ref: 'Users' }]
});
Auditor.addHooks(contestSchema);
const Contest = mongoose.model('Contest', contestSchema);
export default Contest;
export { contestSchema, Contest };
