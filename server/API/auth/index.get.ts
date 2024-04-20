export default defineEventHandler(async (e) => {
  const user = e.context.user
  const token = e.context.token
  return {
    user: user != null,
    token: token != null,
    isAuthenticated: user != null && token != null,
  }
})
