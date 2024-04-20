import mongoose, { Schema } from 'mongoose';
import { Auditor } from './Audit/Audit';

export const companyEnumerators = {};

const companySchema = new Schema({
  name: {
    type: String
  },
  industry: {
    type: String
  },
  founded: {
    type: String
  },
  location: {
    type: String
  },
  urlAvatar: {
    type: String
  },
  teamSize: {
    type: BigInt
  },
  industries: {
    type: []
  },
  founders: {
    type: []
  },
  technologies: {
    type: []
  },
  jobs: [{ type: Schema.Types.ObjectId, ref: 'Jobs' }]
});
Auditor.addHooks(companySchema);
const Company = mongoose.model('Company', companySchema);
export default Company;
export { companySchema, Company };
