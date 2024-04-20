import Problem from '@models/Problem.model.js';
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    return await new Problem(body).save();
  } catch (error) {
    return error;
  }
});
