---
createdAt: 2023-11-22
title: Zod
---
// https://zod.dev/?id=schema-methods
// https://www.npmjs.com/package/nuxt-mongoose
// https://mongoosejs.com/docs/middleware.html#pre
// https://mongoosejs.com/docs/schematypes.html
// https://nuxt-mongoose.nuxt.space/docs/api/utils

```ts
import { z } from 'zod'
import { Model, Document } from 'mongoose'
import { defineMongooseModel } from '#nuxt/mongoose'

export const WizardSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  gender: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  jobTitle: z.string().optional(),
  industry: z.string().optional(),
  house: z.string().optional(),
  potions: z.number().optional(),
  DADA: z.number().optional(),
  charms: z.number().optional(),
  apparition: z.boolean().optional(),
  patronus: z.string().optional(),
  topSpells: z.array(z.string()).optional(),
  createdAt: z.date().optional(),
  avatarUrl: z.string().optional(),
  updatedAt: z.date().optional(),
})

export type WizardType = z.infer<typeof WizardSchema>

type Combined = WizardType & typeof Model & Document

const example: WizardType = {}

export const Wizard = defineMongooseModel({
  name: 'Wizard',
  schema: { ...example },
  options: {},
  hooks(schema) {
    schema.pre('find', function (this: Combined, next) {
      console.log('Before the find')
      next()
    })
    schema.post('find', function (docs, next) {
      console.log('After tbe find the find')
      next()
    })
  },
})
```