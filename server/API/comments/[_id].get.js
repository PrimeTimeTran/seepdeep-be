import Comment from '@models/Comment.model.js';

export default defineEventHandler(async (event) => {
  try {
    return await Comment.findOne({ _id: event.context.params?._id });
  } catch (error) {
    return error;
  }
});
