import mongoose, { Schema } from 'mongoose';
import { Auditor } from './Audit/Audit';

export const topicEnumerators = {};

const topicSchema = new Schema({
  name: {
    type: String
  },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  guides: [{ type: Schema.Types.ObjectId, ref: 'Guide' }],
  problems: [{ type: Schema.Types.ObjectId, ref: 'Problem' }],
  contests: [{ type: Schema.Types.ObjectId, ref: 'Contest' }],
  submissions: [{ type: Schema.Types.ObjectId, ref: 'Submission' }]
});
Auditor.addHooks(topicSchema);
const Topic = mongoose.model('Topic', topicSchema);
export default Topic;
export { topicSchema, Topic };
