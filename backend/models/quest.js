const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
let questSchema = new Schema({
  quest_text: {
    type: String
  }
}, {
    collection: 'quests'
  });
  
module.exports = mongoose.model('Quest', questSchema);