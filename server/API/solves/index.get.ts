import _ from 'lodash'
import mongoose from 'mongoose'

export default defineEventHandler(async (e) => {
  try {
    let { limit, page } = e.context
    let params = getQuery(e)
    let data = await Solve.find({})
      .populate({
        path: 'problem',
        select: 'title',
        options: { strictPopulate: false },
      })
      .exec()
    const response = {
      data,
    }
    return response
  } catch (error) {
    console.log({
      error,
    })
  }
})
