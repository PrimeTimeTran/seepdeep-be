import { getRouterParam } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, '_id')
    return await User.findOne({ _id: id }).populate('submissions')
  } catch (error) {
    return error
  }
})
