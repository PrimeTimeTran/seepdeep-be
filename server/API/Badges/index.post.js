import Badge from '@models/Badge.model.js';
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    return await new Badge(body).save();
  } catch (error) {
    return error;
  }
});
