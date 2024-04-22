import mongoose, { Schema } from 'mongoose';
import { Auditor } from './Audit/Audit';

export const badgeEnumerators = {};

const badgeSchema = new Schema({
  name: {
    type: String
  },
  urlImg: {
    type: String
  },
  year: {
    type: Number
  },
  month: {
    type: Number
  },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});
Auditor.addHooks(badgeSchema);
const Badge = mongoose.model('Badge', badgeSchema);
export default Badge;
export { badgeSchema, Badge };
