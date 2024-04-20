import Company from '@models/Company.model.js';
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    return await new Company(body).save();
  } catch (error) {
    return error;
  }
});
