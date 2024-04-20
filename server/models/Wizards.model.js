import mongoose, { Schema } from 'mongoose';
import { Auditor } from './Audit/Audit';

export const wizardEnumerators = {
  patronus: {
    a: 'a',
    b: 'b',
    c: 'c',
    d: 'd',
    e: 'e'
  },

  topSpells: {
    jinxes: 'jinxes',
    hexes: ' hexes',
    charms: ' charms',
    curses: ' curses',
    spells: ' spells',
    counters: ' counters',
    healing: ' healing',
    transfigurations: ' transfigurations'
  },

  bookAppearances: {
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8'
  },

  house: {
    gryffindor: 'gryffindor',
    slytherin: ' slytherin',
    hufflepuff: ' hufflepuff',
    ravenclaw: ' ravenclaw',
    unknown: ' unknown'
  }
};

const wizardSchema = new Schema({
  email: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  dob: {
    type: String
  },
  location: {
    type: Map,
    of: String
  },
  jobTitle: {
    type: String
  },
  industry: {
    type: String
  },
  patronus: {
    type: String,
    enum: ['a', 'b', 'c', 'd', 'e']
  },
  potions: {
    type: Schema.Types.Decimal128
  },
  charms: {
    type: String
  },
  dada: {
    type: String
  },
  sex: {
    type: String
  },
  avatarUrl: {
    type: String
  },
  topSpells: {
    type: [String],
    enum: [
      'jinxes',
      'hexes',
      'charms',
      'curses',
      'spells',
      'counters',
      'healing',
      'transfigurations'
    ]
  },
  bookAppearances: {
    type: String,
    enum: ['1', '2', '3', '4', '5', '6', '7', '8']
  },
  house: {
    type: String,
    enum: ['gryffindor', 'slytherin', 'hufflepuff', 'ravenclaw', 'unknown']
  }
});
Auditor.addHooks(wizardSchema);
const Wizards = mongoose.model('Wizards', wizardSchema);
export default Wizards;
export { wizardSchema };
