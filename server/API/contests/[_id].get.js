import Contest from '@models/Contest.model.js';
export default defineEventHandler(async (event) => {
  try {
    return await Contest.findOne({ _id: event.context.params?._id });
  } catch (error) {
    return error;
  }
});
