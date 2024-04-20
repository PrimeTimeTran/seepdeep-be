import _ from 'lodash';
import Wizards from '@models/Wizards.model.js';
export default defineEventHandler(async (e) => {
  try {
    let { limit, page } = e.context;
    let params = getQuery(e);
    const query = buildQuery(params);
    const fieldsToPopulate = [{ from: 'users', localField: 'user' }];
    const pipeline = buildPipeline(query, page, limit, fieldsToPopulate);
    const results = await Wizards.aggregate(pipeline);
    let { data, totalCount, pageCount } = results[0];
    if (!_.isEmpty(totalCount) && totalCount[0]) {
      // pageCount = Math.ceil(parseInt(totalCount[0].total) / limit)
      totalCount = totalCount.length > 0 ? totalCount[0].total : 0;
    }
    const response = {
      meta: {
        page,
        pageCount: pageCount,
        totalCount: totalCount
      },
      data
    };
    console.log({response})
    return response;
  } catch (error) {
    console.log({
      error
    });
  }
});
