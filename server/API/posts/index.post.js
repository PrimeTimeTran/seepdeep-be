import Post from '@models/Post.model.js';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    return await new Post(body).save();
  } catch (error) {
    return error;
  }
});
