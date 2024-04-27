import { defineEventHandler, readBody } from 'h3'

import SubmissionService from '@services/Submission.service.js'

export default defineEventHandler(async (e) => {
  try {
    let body = await readBody(e)
    body = JSON.parse(body)
    const user = e.context.user
    if (!user) {
      throw new Error('User not found.')
    }
    let service = new SubmissionService(e, body)
    await service.onNewSubmission()
    return await service.onComplete()
  } catch (error) {
    if (error.message === 'Timeout') {
      throw createError({
        statusCode: 408,
        statusMessage: 'Timeout',
      })
    } else if (error.message === 'User not found') {
      throw createError({
        statusCode: 404,
        message: error,
        statusMessage: 'User not found',
      })
    } else {
      throw createError({
        statusCode: 400,
        message: error,
        statusMessage: 'Submission Error.',
      })
    }
  }
})
