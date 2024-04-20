const protectedRoutes: string[] = []

function isProtectedPath(path: string) {
  return protectedRoutes.some((route) => path.startsWith(route))
}

export default defineEventHandler(async (e: any) => {
  const token = e.node.req.headers.authorization?.split(' ')[1]
  if (isProtectedPath(e.path) && !token) {
    const error = {
      statusCode: 403,
      statusMessage: 'Forbidden: Unauthenticated',
    }
    logger.error({ err: error }, 'Error:')
    throw createError(error)
  } else {
    e.context.token = token
  }
})
