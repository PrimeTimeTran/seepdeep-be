import mongoose from 'mongoose'

export default defineEventHandler(async (event) => {
  const bodyRaw = await readBody(event)
  const body = typeof bodyRaw === 'string' ? JSON.parse(bodyRaw) : bodyRaw
  try {
    const upDown = body.upDown
    const userId = event.context.user._id
    const submissionId = body.id

    const update = {
      ...body,
    }

    delete update.id
    delete update.upDown

    if (['up', 'down'].includes(upDown)) {
      const toAdd = upDown === 'up' ? 'voteIdsUp' : 'voteIdsDown'
      const toRemove = upDown === 'up' ? 'voteIdsDown' : 'voteIdsUp'

      update.$addToSet = { [toAdd]: userId }
      update.$pull = { [toRemove]: userId }
    }

    const updatedSubmission = await Submission.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(submissionId) },
      update,
      { new: true }
    )

    return updatedSubmission
  } catch (error) {
    console.log({ error: error })
    return error
  }
})
