import mongoose, { Schema } from 'mongoose';
import { Auditor } from './Audit/Audit';

const solveSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  problem: { type: Schema.Types.ObjectId, ref: 'Problem' },
});
Auditor.addHooks(solveSchema);
const Solve = mongoose.model('Solve', solveSchema);
export default Solve;
export { solveSchema, Solve };
