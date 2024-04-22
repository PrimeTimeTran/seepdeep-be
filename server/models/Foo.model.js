import mongoose, { Schema } from 'mongoose';
import { Auditor } from './Audit/Audit';

export const fooEnumerators = {
  fooEnumerator: {
    a: 'a',
    b: 'b',
    c: 'c'
  },

  foodEnumeratorMulti: {
    a: 'a',
    b: 'b',
    c: 'c'
  }
};

const fooSchema = new Schema({
  fooBoolean: {
    type: Boolean
  },
  fooString: {
    type: String
  },
  fooText: {
    type: String
  },
  fooInteger: {
    type: Number
  },
  fooDecimal: {
    type: Schema.Types.Decimal128
  },
  fooDate: {
    type: Date
  },
  fooDateTime: {
    type: Date
  },
  fooArray: {
    type: []
  },
  fooMap: {
    type: Map,
    of: String
  },
  fooEnumerator: {
    type: String,
    enum: ['a', 'b', 'c']
  },
  foodEnumeratorMulti: {
    type: [String],
    enum: ['a', 'b', 'c']
  },
  fooOTM: [{ type: Schema.Types.ObjectId, ref: 'Related' }],
  fooMTO: { type: Schema.Types.ObjectId, ref: 'Related' },
  fooOTO: { type: Schema.Types.ObjectId, ref: 'Related' },
  fooMTM: [{ type: Schema.Types.ObjectId, ref: 'Related' }]
});
Auditor.addHooks(fooSchema);
const Foo = mongoose.model('Foo', fooSchema);
export default Foo;
export { fooSchema, Foo };
