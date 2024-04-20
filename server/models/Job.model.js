import mongoose, { Schema } from 'mongoose';
import { Auditor } from './Audit/Audit';

export const jobEnumerators = {};

const jobSchema = new Schema({
  title: {
    type: String
  },
  caption: {
    type: String
  },
  location: {
    type: String
  },
  type: {
    type: String
  },
  description: {
    type: String
  },
  experience: {
    type: String
  },
  project: {
    type: String
  },
  requirements: {
    type: String
  },
  whoAreYou: {
    type: String
  },
  equity: {
    type: String
  },
  benefits: {
    type: String
  },
  isRemote: {
    type: Boolean
  },
  technologies: {
    type: []
  },
  company: { type: Schema.Types.ObjectId, ref: 'Company' },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});
Auditor.addHooks(jobSchema);
const Job = mongoose.model('Job', jobSchema);
export default Job;
export { jobSchema, Job };
