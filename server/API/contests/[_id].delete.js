import Contest from '@models/Contest.model.js';
export default defineEventHandler(async (event) => {
  try {
    const doc = await Contest.findOneAndUpdate(
      {
        _id: event.context.params?._id
      },
      { $set: { isSoftDeleted: true } },
      { new: true }
    );

    if (!doc) {
      return 'Document not found.';
    }

    return doc;
  } catch (error) {
    return error;
  }
});
