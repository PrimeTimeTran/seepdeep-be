import Submission from '@models/Submission.model.js';
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    const u = event.context.user
    const submission = await new Submission(body).save();

    return submission;
  } catch (error) {
    return error;
  }
});
