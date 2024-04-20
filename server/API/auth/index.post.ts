export default defineEventHandler(async (e) => {
  const body = await readBody(e)

  const user = await User.findOne({ email: body.email })
  return {
    user: user,
  }
})
