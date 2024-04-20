import Guide from '@models/Guide.model.js';
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    return await Guide.findOneAndUpdate(
      { _id: event.context.params?._id },
      body,
      { new: true }
    );
  } catch (error) {
    return error;
  }
});
