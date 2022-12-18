const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
let enemySchema = new Schema({
  name: {
    type: String
  },
  level: {
    type: Number
  },
  gender: {
    type: String
  },
  race: {
    type: String
  },
  class: {
    type: String
  },
  strength: {
    type: Number
  },
  dexterity: {
    type: Number
  },
  constitution: {
    type: Number
  },
  intelligence: {
    type: Number
  },
  wisdom: {
    type: Number
  },
  charisma: {
    type: Number
  },
  hp_current: {
    type: Number
  },
  hp_max: {
    type: Number
  },
  ac: {
    type: Number
  },
  notes: {
    type: String
  }
}, {
    collection: 'enemies'
  });
  
module.exports = mongoose.model('Enemy', enemySchema);