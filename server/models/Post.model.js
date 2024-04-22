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
    type: Number
  },
  numViews: {
    type: Number
  },
  numComments: {
    type: Number
  },
  timeSubmitted: {
    type: Date
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  topics: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
  voterIds: {
    type: Map,
    of: String
  }
});
Auditor.addHooks(postSchema);
const Post = mongoose.model('Post', postSchema);
export default Post;
export { postSchema, Post };
