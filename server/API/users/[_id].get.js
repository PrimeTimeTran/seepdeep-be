import { getRouterParam } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, '_id')
    const user = await User.findOne({ _id: id }).populate('submissions')
    return {
      data: user,
    }
  } catch (error) {
    return error
  }
})
