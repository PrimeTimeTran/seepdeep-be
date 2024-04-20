import Wizards from '@models/Wizards.model.js';
export default defineEventHandler(async (event) => {
  try {
    const doc = await Wizards.findOneAndUpdate(
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
