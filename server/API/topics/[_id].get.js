import Topic from '@models/Topic.model.js';

export default defineEventHandler(async (event) => {
  try {
    return await Topic.findOne({ _id: event.context.params?._id });
  } catch (error) {
    return error;
  }
});
