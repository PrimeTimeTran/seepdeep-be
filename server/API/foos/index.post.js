import Foo from '@models/Foo.model.js';
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    return await new Foo(body).save();
  } catch (error) {
    return error;
  }
});
