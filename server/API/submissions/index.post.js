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
    if (error === 'Timeout occurred') {
      throw createError({
        statusCode: 408,
        statusMessage: 'Timeout Error',
      })
    } else {
      throw createError({
        statusCode: 400,
        message: error,
        statusMessage: 'Submission Error.'
      })
    }
  }
})
