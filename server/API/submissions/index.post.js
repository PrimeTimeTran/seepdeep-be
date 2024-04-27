import { defineEventHandler, readBody } from 'h3'

import SubmissionService, {
  eventEmitter,
} from '@services/Submission.service.js'

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
    const resultPromise = new Promise((resolve, reject) => {
      eventEmitter.once('finish', (number) => {
        resolve({
          data: {
            result: service.runResult,
            submission: service.submission,
          },
        })
      })
    })
    return await resultPromise
  } catch (error) {
    console.error('Error while creating submission:', error)
    return error
  }
})
