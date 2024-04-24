import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (e) => {
  try {
    let body = await readBody(e)
    body = JSON.parse(body)
    const user = e.context.user
    if (!user) {
      throw new Error('User not found in context')
    }
    const submission = new Submission({...body, user: user._id, problem: body.problem });
    await submission.save();
    user.submissions.push(submission._id);
    await user.save()
    return {
      data: submission,
    }
  } catch (error) {
    console.error('Error while creating submission:', error)
    return error
  }
})
