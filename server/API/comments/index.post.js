export default defineEventHandler(async (event) => {
  const bodyRaw = await readBody(event)
  const body = typeof bodyRaw === 'string' ? JSON.parse(bodyRaw) : bodyRaw
  try {
    const comment = await new Comment(body).save()
    if (comment.submission) {
      await Submission.findByIdAndUpdate(comment.submission, {
        $push: { comments: comment._id },
      })
    }
    return comment
  } catch (error) {
    return error
  }
})
