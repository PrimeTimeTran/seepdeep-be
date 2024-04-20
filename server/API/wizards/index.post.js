import Wizards from '@models/Wizards.model.js';
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    return await new Wizards(body).save();
  } catch (error) {
    return error;
  }
});
