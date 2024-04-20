import Notification from '@models/Notification.model.js';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    return await new Notification(body).save();
  } catch (error) {
    return error;
  }
});
