import Submission from '@models/Submission.model.js';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    return await new Submission(body).save();
  } catch (error) {
    return error;
  }
});
