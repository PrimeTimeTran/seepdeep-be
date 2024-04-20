import Job from '@models/Job.model.js';
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    return await new Job(body).save();
  } catch (error) {
    return error;
  }
});
