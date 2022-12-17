const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
let NPCSchema = new Schema({
  name: {
    type: String
  },
  location: {
    type: String
  },
  notes: {
    type: String
  }
}, {
    collection: 'npcs'
  });
  
module.exports = mongoose.model('NPC', NPCSchema);