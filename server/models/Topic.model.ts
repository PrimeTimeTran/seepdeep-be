import { z } from 'zod'
import mongoose from 'mongoose'
import { zId } from '@zodyac/zod-mongoose'

import { Auditor } from './Audit/Audit'
import { zodToMongooseSchema } from './model.helpers'

const zTopic = z.object({
  name: z.string(),
  posts: z.array(zId('Post')).default([]),
  guides: z.array(zId('Guide')).default([]),
  contests: z.array(zId('Contest')).default([]),
  submissions: z.array(zId('Submission')).default([]),
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
