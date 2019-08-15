const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const MessageSchema = new Schema({
  content: {
    type: String,
    required: true
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },

  conversation: {
    type: Schema.Types.ObjectId,
    ref: 'conversations'
  }
});

module.exports = User = mongoose.model('messages', MessageSchema);