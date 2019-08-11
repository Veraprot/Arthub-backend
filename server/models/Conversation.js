const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ConversationSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  recipients: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],

  messages: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      message: String,
    }
  ], 
});

module.exports = User = mongoose.model('conversations', ConversationSchema);