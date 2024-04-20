import Comment from '@models/Comment.model.js';
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    return await new Comment(body).save();
  } catch (error) {
    return error;
  }
});
