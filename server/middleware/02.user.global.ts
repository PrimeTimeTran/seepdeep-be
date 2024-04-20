interface token {
  userId: String
}

export default defineEventHandler(async (e) => {
  const user: token = jwtVerify(e.context.token) as token
  console.log({
    user
  })
  if (user) {
    const id = user.userId
    const me = await User.findById(id).exec()
    e.context.user = me
  }
})
