export default defineEventHandler(async (event) => {
  const bodyRaw = await readBody(event)
  const body = typeof bodyRaw === 'string' ? JSON.parse(bodyRaw) : bodyRaw
  try {
    return await Submission.findOneAndUpdate(
      { _id: event.context.params?._id },
      body,
      { new: true }
    )
  } catch (error) {
    return error
  }
})
