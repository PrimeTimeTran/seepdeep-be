import _ from 'lodash'
import mongoose from 'mongoose'

export default defineEventHandler(async (e) => {
  try {
    let { limit, page } = e.context
    let params = getQuery(e)
    const query = {
      isShared: true,
      problem: new mongoose.Types.ObjectId(params.problem),
    }
    if (params.explanation) {
      query.explanation = {
        $regex: params.explanation,
        $options: 'i',
      }
    }
    const subDocs = await Submission.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(20)
      .populate({
        path: 'user',
        select: 'urlAvatar username urlCSProfile',
      })
    const response = {
      meta: {
        page,
        pageCount: Math.ceil(subDocs.length / limit),
        totalCount: subDocs.length,
      },
      data: subDocs,
    }
    return response
  } catch (error) {
    console.log({
      error,
    })
  }
})
