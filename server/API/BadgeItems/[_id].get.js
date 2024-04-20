import BadgeItem from '@models/BadgeItem.model.js';
export default defineEventHandler(async (event) => {
  try {
    return await BadgeItem.findOne({ _id: event.context.params?._id });
  } catch (error) {
    return error;
  }
});
