export default defineEventHandler(async (e) => {
  //   try {
  //     const name = e.node.req.client.parser.incoming.rawHeaders[9].split('.')[0]
  //     if (name) {
  //       const regex = new RegExp('^' + name + '$', 'i')
  //       const tenant = await Tenant.findOne({ name: { $regex: regex } })
  //       logger.debug({ tenant, name }, 'Tenant')
  //       e.context.tenant = tenant
  //     }
  //   } catch (err) {
  //     logger.error(err, 'Subdomain error')
  //   }
  // middleware/googleDirections.js
})
