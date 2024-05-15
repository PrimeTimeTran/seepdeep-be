export default defineEventHandler(async (e) => {
  try {
    let body = await readBody(e)
    body = JSON.parse(body)
    let user = await User.findOne({ email: body.email })
    if (user) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Error: Email taken',
      })
    }

    const hash = await encryptPassword(body.password)
    const result = await decryptPassword(body.password, hash)

    user = await new User({
      email: body.email,
      passwordDigest: hash,
    })

    await user.save()
    const token = await jwtSign({ userId: user._id })
    const newUser = {
      ...user.toJSON(),
      id: user._id
    }
    const resp = {
      user: newUser,
      result,
      token,
    }
    logger.info({ resp }, 'User account created.')
    return resp
  } catch (error) {
    logger.fatal({ error })
    return {
      error,
    }
  }
})
