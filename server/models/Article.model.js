import mongoose, { Schema } from 'mongoose';
import { Auditor } from './Audit/Audit';

export const articleEnumerators = {};

const articleSchema = new Schema({
  type: {
    type: String
  },
  title: {
    type: String
  },
  caption: {
    type: String
  },
  body: {
    type: String
  },
  link: {
    type: String
  },
  urlCoverImg: {
    type: String
  },
  urlVideo: {
    type: String
  },
  language: {
    type: String
  },
  numComments: {
    type: BigInt
  },
  numVotes: {
    type: BigInt
  },
  isPublished: {
    type: Boolean
  },
  isOriginal: {
    type: Boolean
  },
  author: { type: Schema.Types.ObjectId, ref: 'Author' },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comments' }],
  voterIds: {
    type: Map,
    of: String
  }
});
Auditor.addHooks(articleSchema);
const Article = mongoose.model('Article', articleSchema);
export default Article;
export { articleSchema, Article };
