const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
let characterSchema = new Schema({
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
  initiative: {
    type: Number,
    default: 0
  }
}, {
    collection: 'characters'
  });
  
module.exports = mongoose.model('Character', characterSchema);