import _ from 'lodash'
import mongoose from 'mongoose'

export default defineEventHandler(async (e) => {
  try {
    let { limit, page } = e.context
    let params = getQuery(e)
    const query = buildQuery(params)
    if (params.submission) {
      query.submission = new mongoose.Types.ObjectId(params.submission)
    }
    const submission = await Submission.findOne(query.submission)
    if (submission) {
      submission.viewCount = (submission.viewCount || 0) + 1
      await submission.save()
    } else {
      console.log('Submission not found')
    }

    const fieldsToPopulate = [{ from: 'users', localField: 'user' }]
    const pipeline = buildPipeline(query, page, limit, fieldsToPopulate)
    const results = await Comment.aggregate(pipeline)
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
