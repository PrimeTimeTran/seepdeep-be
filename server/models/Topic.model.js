import mongoose, { Schema } from 'mongoose';
import { Auditor } from './Audit/Audit';

export const topicEnumerators = {};

const topicSchema = new Schema({
  name: {
    type: String
  },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Posts' }],
  guides: [{ type: Schema.Types.ObjectId, ref: 'Guides' }],
  problems: [{ type: Schema.Types.ObjectId, ref: 'Problems' }],
  contests: [{ type: Schema.Types.ObjectId, ref: 'Contests' }],
  submissions: [{ type: Schema.Types.ObjectId, ref: 'Submissions' }]
});
Auditor.addHooks(topicSchema);
const Topic = mongoose.model('Topic', topicSchema);
export default Topic;
export { topicSchema, Topic };
