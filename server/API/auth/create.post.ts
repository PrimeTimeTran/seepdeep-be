export default defineEventHandler(async (e) => {
  try {
    let body = await readBody(e)
    body = JSON.parse(body)
    User.findOne({ email: body.email }).then(async (u) => {
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
      const resp = {
        user,
        result,
        token,
      }
      logger.info({resp}, 'Userr account created.')
      return resp
    })
  } catch (error) {
    logger.fatal({error})
    return {
      error
    }
  }
})
