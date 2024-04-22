import mongoose, { Schema } from 'mongoose';
import { Auditor } from './Audit/Audit';

export const notificationItemEnumerators = {};

const notificationItemSchema = new Schema({
  icon: {
    type: Number
  },
  isRead: {
    type: Boolean
  },
  points: {
    type: Number
  },
  date: {
    type: Date
  },
  notifiableId: {
    type: String
  },
  notifiableType: {
    type: String
  },
  type: {
    type: String
  },
  notification: {
    type: String
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});
Auditor.addHooks(notificationItemSchema);
const NotificationItem = mongoose.model(
  'NotificationItem',
  notificationItemSchema
);
export default NotificationItem;
export { notificationItemSchema, NotificationItem };
