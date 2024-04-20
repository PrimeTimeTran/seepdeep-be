import Job from '@models/Job.model.js';
export default defineEventHandler(async (event) => {
  try {
    return await Job.findOne({ _id: event.context.params?._id });
  } catch (error) {
    return error;
  }
});
