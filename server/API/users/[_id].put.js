import User from '@models/User.model.js';
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    return await User.findOneAndUpdate(
      { _id: event.context.params?._id },
      body,
      { new: true }
    );
  } catch (error) {
    return error;
  }
});
