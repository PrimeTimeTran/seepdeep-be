import mongoose, { Schema } from 'mongoose';
import { Auditor } from './Audit/Audit';

export const SolveMasteryLevels = Object.freeze({
  encountered: 'Encountered',
  novice: 'Novice', 
  apprentice: 'Apprentice', 
  proficient: 'Proficient', 
  intermediate: 'Intermediate', 
  advanced: 'Advanced', 
  expert: 'Expert', 
  guru:'Guru',
  legend: 'Legend', 
})

const solveSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  problem: { type: Schema.Types.ObjectId, ref: 'Problem' },
  problemName: { type: String },
  level:{
    type: String,
    enum: ['Encountered', 'Novice', 'Apprentice', 'Proficient', 'Intermediate', 'Advanced', 'Expert', 'Guru', 'Legend'],
  },
  nextSolve: {
    type: Date
  },
  // Twice as long as the solve. If the user doesn't solve by penalty date we make them drop by one point
  nextPenalty: {
    type: Date
  },
  countEncountered: {
    type: Number
  },
  countNovice: {
    type: Number
  },
  countApprentice: {
    type: Number
  },
  countProficient: {
    type: Number
  },
  countIntermediate: {
    type: Number
  },
  countAdvanced: {
    type: Number
  },
  countExpert: {
    type: Number
  },
  countGuru: {
    type: Number
  },
  countLegend: {
    type: Number
  },
});
Auditor.addHooks(solveSchema);
const Solve = mongoose.model('Solve', solveSchema);
export default Solve;
export { solveSchema, Solve };
