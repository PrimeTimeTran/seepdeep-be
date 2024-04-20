import Topic from '@models/Topic.model.js';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    return await new Topic(body).save();
  } catch (error) {
    return error;
  }
});
