import Participant from '@models/Participant.model.js';
export default defineEventHandler(async (event) => {
  try {
    return await Participant.findOne({ _id: event.context.params?._id });
  } catch (error) {
    return error;
  }
});
