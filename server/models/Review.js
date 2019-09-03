const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ReviewSchema = new Schema({
  message: {
    type: String,
    required: true
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

module.exports = User = mongoose.model('reviews', ReviewSchema);