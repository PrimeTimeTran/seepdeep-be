import User from '@models/User.model.js';

export default defineEventHandler(async (event) => {
  try {
    return await User.findOne({ _id: event.context.params?._id });
  } catch (error) {
    return error;
  }
});
