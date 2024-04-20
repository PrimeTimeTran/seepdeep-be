import mongoose, { Schema } from 'mongoose';
import { Auditor } from './Audit/Audit';

export const userEnumerators = {
  status: {
    pending: 'pending',
    active: 'active',
    closed: 'closed',
    deactivated: 'deactivated',
    blocked: 'blocked'
  },
  role: {
    owner: 'owner',
    admin: 'admin',
    staff: 'staff',
    customer: 'customer'
  }
};

const userSchema = new Schema({
  email: {
    type: String
  },
  passwordDigest: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  age: {
    type: BigInt
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'closed', 'deactivated', 'blocked']
  },
  city: {
    type: String
  },
  country: {
    type: String
  },
  dob: {
    type: Date
  },
  username: {
    type: String
  },
  urlAvatar: {
    type: String
  },
  urlPaypal: {
    type: String
  },
  urlGithub: {
    type: String
  },
  urlLinkedIn: {
    type: String
  },
  urlPortfolio: {
    type: String
  },
  urlCSProfile: {
    type: String
  },
  urlSites: {
    type: String
  },
  views: {
    type: BigInt
  },
  discuss: {
    type: BigInt
  },
  solutions: {
    type: BigInt
  },
  reputation: {
    type: BigInt
  },
  contestRating: {
    type: BigInt
  },
  globalRanking: {
    type: BigInt
  },
  attended: {
    type: BigInt
  },
  startYear: {
    type: BigInt
  },
  numSubmissions: {
    type: BigInt
  },
  numAcceptedProblems: {
    type: BigInt
  },
  numSubmittedProblems: {
    type: BigInt
  },
  numAcceptedSubmissions: {
    type: BigInt
  },
  gender: {
    type: String
  },
  top: {
    type: Schema.Types.Decimal128
  },
  submissions: [{ type: Schema.Types.ObjectId, ref: 'Submissions' }],
  posts: [{ type: Schema.Types.ObjectId, ref: 'Posts' }],
  contests: [{ type: Schema.Types.ObjectId, ref: 'Contests' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comments' }],
  articles: [{ type: Schema.Types.ObjectId, ref: 'Articles' }],
  problems: [{ type: Schema.Types.ObjectId, ref: 'Problems' }],
  meta: {
    type: Map,
    of: String
  },
  badges: [{ type: Schema.Types.ObjectId, ref: 'Badges' }],
  role: {
    type: [String],
    enum: ['owner', 'admin', 'staff', 'customer']
  },
  streak: {
    type: Map,
    of: String
  },
  languages: {
    type: Map,
    of: String
  }
});
Auditor.addHooks(userSchema);
const User = mongoose.model('User', userSchema);
export default User;
export { userSchema };
