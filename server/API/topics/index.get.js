import _ from 'lodash'

export default defineEventHandler(async (e) => {
  try {
    let { limit, page } = e.context
    let params = getQuery(e)
    const query = buildQuery(params)
    const fieldsToPopulate = [{ from: 'users', localField: 'user' }]
    const pipeline = buildPipeline(query, page, 50, fieldsToPopulate)
    const results = await Topic.aggregate(pipeline)
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
