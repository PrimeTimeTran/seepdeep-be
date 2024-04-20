import mongoose, { Schema } from 'mongoose';
import { Auditor } from './Audit/Audit';

export const badgeItemEnumerators = {};

const badgeItemSchema = new Schema({
  date: {
    type: Date
  },
  month: {
    type: String
  },
  year: {
    type: String
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  badge: { type: Schema.Types.ObjectId, ref: 'Badge' }
});
Auditor.addHooks(badgeItemSchema);
const BadgeItem = mongoose.model('BadgeItem', badgeItemSchema);
export default BadgeItem;
export { badgeItemSchema };
