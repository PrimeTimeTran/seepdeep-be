import { z } from 'zod'
declare module 'h3' {
  interface H3EventContext {
    page: number
    limit: number
  }
}

const schema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
})

export default defineEventHandler(async (e) => {
  try {
    const query = schema.parse(getQuery(e))
    const page = Number(query.page || 1)
    let limit = parseInt(query.limit || '10')
    limit = typeof query['limit'] === 'string' ? parseInt(query['limit']?.split('?')[0]) : 10
    e.context.page = page
    e.context.limit = limit
  } catch (error) {
    logger.error({ err: error }, 'Error:')
  }
})
