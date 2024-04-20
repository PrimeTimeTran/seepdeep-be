import Article from '@models/Article.model.js';
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    return await Article.findOneAndUpdate(
      { _id: event.context.params?._id },
      body,
      { new: true }
    );
  } catch (error) {
    return error;
  }
});
