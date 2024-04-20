export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    return await new NotificationItem(body).save();
  } catch (error) {
    return error;
  }
});
