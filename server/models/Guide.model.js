import mongoose, { Schema } from 'mongoose';
import { Auditor } from './Audit/Audit';

export const guideEnumerators = {};

const guideSchema = new Schema({
  title: {
    type: String
  },
  body: {
    type: String
  },
  caption: {
    type: String
  },
  description: {
    type: String
  },
  topics: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
  problems: [{ type: Schema.Types.ObjectId, ref: 'Problem' }]
});
Auditor.addHooks(guideSchema);
const Guide = mongoose.model('Guide', guideSchema);
export default Guide;
export { guideSchema, Guide };
