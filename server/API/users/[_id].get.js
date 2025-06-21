import { getRouterParam } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, '_id')
    const user = await User.findOne({ _id: id }).populate({
      path: 'submissions',
      populate: {
        path: 'problem',
        select: '_id title',
      },
    })
    return {
      data: user,
    }
  } catch (error) {
    return error
  }
})
