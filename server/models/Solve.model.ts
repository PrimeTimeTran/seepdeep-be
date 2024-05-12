import { z } from 'zod'
import mongoose from 'mongoose'
import { zId } from '@zodyac/zod-mongoose'

import { Auditor } from './Audit/Audit'
import { zodToMongooseSchema } from './model.helpers'

export enum Mastery {
  Encountered = 'Encountered',
  Novice = 'Novice',
  Apprentice = 'Apprentice',
  Proficient = 'Proficient',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
  Expert = 'Expert',
  Guru = 'Guru',
  Legend = 'Legend',
}

const zSolve = z.object({
  user: zId.describe('ObjectId:User'),
  problem: zId.describe('ObjectId:Problem'),
  countEncountered: z.number().default(1),
  countNovice: z.number().default(0),
  countApprentice: z.number().default(0),
  countProficient: z.number().default(0),
  countIntermediate: z.number().default(0),
  countAdvanced: z.number().default(0),
  countExpert: z.number().default(0),
  countGuru: z.number().default(0),
  countLegend: z.number().default(0),
  nextSolve: z.date(),
  level: z.nativeEnum(Mastery).default(Mastery.Encountered),
})

const solveSchemaDefinition = zodToMongooseSchema(zSolve)
const solveSchema = new mongoose.Schema(solveSchemaDefinition)

Auditor.addHooks(solveSchema)
const Solve = mongoose.model('Solve', solveSchema)

export type SolveType = z.infer<typeof zSolve> &
  mongoose.Document & {
    markModified: (path: string) => void
  }

export default Solve
export { solveSchema, Solve }
