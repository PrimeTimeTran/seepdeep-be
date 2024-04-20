export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    return await new Participant(body).save();
  } catch (error) {
    return error;
  }
});
