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
    service = await service.onNewSubmission()
    print(service.runResult)
    return {
      data: {
        result: service.runResult,
        submission: service.submission
      }
    }
  } catch (error) {
    console.error('Error while creating submission:', error)
    return error
  }
})
