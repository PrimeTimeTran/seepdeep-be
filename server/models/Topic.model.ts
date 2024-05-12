import { z } from 'zod'
import mongoose from 'mongoose'
import { zId } from '@zodyac/zod-mongoose'

import { Auditor } from './Audit/Audit'
import { zodToMongooseSchema } from './model.helpers'

const zTopic = z.object({
  name: z.string(),
  posts: z.array(zId.describe('ObjectId:Post')),
  guides: z.array(zId.describe('ObjectId:Guide')),
  contests: z.array(zId.describe('ObjectId:Contest')),
  submissions: z.array(zId.describe('ObjectId:Submission')),
})

const topicSchemaDefinition = zodToMongooseSchema(zTopic)
const topicSchema = new mongoose.Schema(topicSchemaDefinition)

Auditor.addHooks(topicSchema)
const Topic = mongoose.model('Topic', topicSchema)

export type TopicType = z.infer<typeof zTopic> &
  mongoose.Document & {
    markModified: (path: string) => void
  }

export default Topic
export { topicSchema, Topic }