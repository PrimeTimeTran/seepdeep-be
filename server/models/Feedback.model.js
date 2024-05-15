import mongoose, { Schema } from 'mongoose';
import { Auditor } from './Audit/Audit';

const feedbackSchema = new Schema({
  title: {
    type: String
  },
  body: {
    type: String
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  type: { type: Schema.Types.ObjectId, ref: 'User' },
});
Auditor.addHooks(feedbackSchema);
const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;
export { feedbackSchema, Feedback };
