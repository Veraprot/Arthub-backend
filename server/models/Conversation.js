const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ConversationSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  ],

  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'messages'
    }
  ]
});

module.exports = User = mongoose.model('conversations', ConversationSchema);