export default defineEventHandler(async (e) => {
  const body = await readBody(e)
  const u = await User.findOne({ email: body.email })
  if (u) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Error: Email taken',
    })
  }

  const hash = await encryptPassword(body.password)
  const result = await decryptPassword(body.password, hash)

  const user = await new User({
    email: body.email,
    passwordDigest: hash,
  })

  await user.save()

  const token = await jwtSign({ userId: user._id })
  return {
    user,
    result,
    token,
  }
})
