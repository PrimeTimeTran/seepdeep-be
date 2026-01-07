export default defineEventHandler(async (e) => {
  const body = await readBody(e)

  if (!body?.email || !body?.password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing email or password',
    })
  }

  const existingUser = await User.findOne({ email: body.email })
  if (existingUser) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email taken',
    })
  }

  const hash = await encryptPassword(body.password)

  const user = await User.create({
    email: body.email,
    passwordDigest: hash,
  })

  user.$locals = {
    actor: e.context.user ?? null,
  }

  const token = await jwtSign({ userId: user._id })

  return {
    user: {
      ...user.toJSON(),
      id: user._id,
    },
    token,
  }
})
