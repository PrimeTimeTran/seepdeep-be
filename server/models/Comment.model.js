import mongoose, { Schema } from 'mongoose'
import { Auditor } from './Audit/Audit'

export const commentEnumerators = {}

const commentSchema = new Schema({
  body: {
    type: String,
  },
  code: {
    type: String,
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  post: { type: Schema.Types.ObjectId, ref: 'Post' },
  article: { type: Schema.Types.ObjectId, ref: 'Article' },
  comment: { type: Schema.Types.ObjectId, ref: 'Comment' },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  problem: { type: Schema.Types.ObjectId, ref: 'Problem' },
  submission: { type: Schema.Types.ObjectId, ref: 'Submission' },
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
})
Auditor.addHooks(commentSchema)
const Comment = mongoose.model('Comment', commentSchema)
export default Comment
export { commentSchema, Comment }
