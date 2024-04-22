import mongoose, { Schema } from 'mongoose';
import { Auditor } from './Audit/Audit';

export const notificationEnumerators = {};

const notificationSchema = new Schema({
  title: {
    type: String
  },
  body: {
    type: String
  },
  type: {
    type: String
  },
  points: {
    type: Number
  },
  isPublished: {
    type: Boolean
  },
  date: {
    type: Date
  }
});
Auditor.addHooks(notificationSchema);
const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
export { notificationSchema, Notification };
