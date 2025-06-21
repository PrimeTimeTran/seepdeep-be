import mongoose from 'mongoose'
import { z } from 'zod'

export function zodToMongooseSchema(zodSchema) {
  const schema = {}

  for (const key in zodSchema.shape) {
    const zodType = zodSchema.shape[key]
    if (key === 'submissions') {
      schema[key] = [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Submission',
          required: !zodType.isOptional(),
        },
      ]
    } else if (zodType instanceof z.ZodString) {
      schema[key] = {
        type: String,
        required: !zodType.isOptional(),
      }
    } else if (zodType instanceof z.ZodNumber) {
      schema[key] = {
        type: Number,
        required: !zodType.isOptional(),
      }
    } else if (zodType instanceof z.ZodDate) {
      schema[key] = {
        type: Date,
        required: !zodType.isOptional(),
      }
    } else if (zodType instanceof z.ZodBoolean) {
      schema[key] = {
        type: Boolean,
        required: !zodType.isOptional(),
      }
    } else if (zodType instanceof z.ZodArray) {
      const elementType = zodToMongooseSchema(
        z.object({ item: zodType.element })
      )
      schema[key] = {
        type: [elementType.item],
        required: !zodType.isOptional(),
      }
    } else if (zodType instanceof z.ZodObject) {
      schema[key] = zodToMongooseSchema(zodType)
    } else if (zodType instanceof z.ZodOptional) {
      schema[key] = {
        type: zodToMongooseSchema(zodType.unwrap()),
        required: false,
      }
    } else if (key === 'problem' || key === 'user') {
      schema[key] = {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem',
        required: !zodType.isOptional(),
      }
    } else if (zodType instanceof z.ZodDefault) {
      schema[key] = {
        type: zodType._def.innerType instanceof z.ZodNumber ? Number : String,
        required: !zodType.isOptional(),
        default: zodType._def.defaultValue(),
      }
    }
  }

  return schema
}

export const mongoIdSchema = z.string().regex(/^[0-9a-f]{24}$/)
