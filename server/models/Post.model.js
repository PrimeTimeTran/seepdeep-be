import mongoose, { Schema } from 'mongoose';
import { Auditor } from './Audit/Audit';

export const postEnumerators = {};

const postSchema = new Schema({
  title: {
    type: String
  },
  body: {
    type: String
  },
  isPublished: {
    type: Boolean
  },
  numVotes: {
    type: BigInt
  },
  numViews: {
    type: BigInt
  },
  numComments: {
    type: BigInt
  },
  timeSubmitted: {
    type: Date
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comments' }],
  topics: [{ type: Schema.Types.ObjectId, ref: 'Topics' }],
  voterIds: {
    type: Map,
    of: String
  }
});
Auditor.addHooks(postSchema);
const Post = mongoose.model('Post', postSchema);
export default Post;
export { postSchema, Post };
