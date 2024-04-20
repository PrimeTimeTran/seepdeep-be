import Foo from '@models/Foo.model.js';

export default defineEventHandler(async (event) => {
  try {
    return await Foo.findOne({ _id: event.context.params?._id });
  } catch (error) {
    return error;
  }
});
