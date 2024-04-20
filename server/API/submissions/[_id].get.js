import Submission from '@models/Submission.model.js';
export default defineEventHandler(async (event) => {
  try {
    return await Submission.findOne({ _id: event.context.params?._id });
  } catch (error) {
    return error;
  }
});
