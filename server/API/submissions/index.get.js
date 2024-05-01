import _ from 'lodash'
import mongoose from 'mongoose'

export default defineEventHandler(async (e) => {
  try {
    let { limit, page } = e.context
    let params = getQuery(e)
    if (params.user == 'true') {
      const subIds = [...new Set(e.context.user.submissions)]
      const subDocs = await Submission.find({
        _id: { $in: subIds },
        problem: new mongoose.Types.ObjectId(params.problem),
      })
        .skip((page - 1) * limit)
        .limit(limit)
      const response = {
        meta: {
          page,
          pageCount: Math.ceil(subIds.length / limit),
          totalCount: subIds.length,
        },
        data: subDocs,
      }

      return response
    }
    const query = buildQuery(params)
    const fieldsToPopulate = [{ from: 'users', localField: 'user' }]
    const pipeline = buildPipeline(query, page, limit, fieldsToPopulate)
    const results = await Submission.aggregate(pipeline)
    let { data, totalCount, pageCount } = results[0]
    if (!_.isEmpty(totalCount) && totalCount[0]) {
      // pageCount = Math.ceil(parseInt(totalCount[0].total) / limit)
      totalCount = totalCount.length > 0 ? totalCount[0].total : 0
    }
    const response = {
      meta: {
        page,
        pageCount: pageCount,
        totalCount: totalCount,
      },
      data,
    }
    return response
  } catch (error) {
    console.log({
      error,
    })
  }
})
