import Badge from '@models/Badge.model.js';
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    return await Badge.findOneAndUpdate(
      { _id: event.context.params?._id },
      body,
      { new: true }
    );
  } catch (error) {
    return error;
  }
});
