import BadgeItem from '@models/BadgeItem.model.js';
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    return await new BadgeItem(body).save();
  } catch (error) {
    return error;
  }
});
