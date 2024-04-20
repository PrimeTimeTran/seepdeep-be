import Notification from '@models/Notification.model.js';
export default defineEventHandler(async (event) => {
  try {
    return await Notification.findOne({ _id: event.context.params?._id });
  } catch (error) {
    return error;
  }
});
