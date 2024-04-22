import mongoose, { Schema } from 'mongoose';
import { Auditor } from './Audit/Audit';

export const participantEnumerators = {};

const participantSchema = new Schema({
  name: {
    type: String
  },
  contest: [{ type: Schema.Types.ObjectId, ref: 'Contest' }],
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  submission: { type: Schema.Types.ObjectId, ref: 'Submission' },
  score: {
    type: Number
  },
  rank: {
    type: Number
  },
  rating: {
    type: Number
  },
  time: {
    type: Date
  }
});
Auditor.addHooks(participantSchema);
const Participant = mongoose.model('Participant', participantSchema);
export default Participant;
export { participantSchema, Participant };
