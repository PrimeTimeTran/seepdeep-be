import Wizards from '@models/Wizards.model.js';

export default defineEventHandler(async (event) => {
  try {
    return await Wizards.findOne({ _id: event.context.params?._id });
  } catch (error) {
    return error;
  }
});
