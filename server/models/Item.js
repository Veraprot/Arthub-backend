const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
  images: [
    {
    type: String,
    required: true
    }
  ],

  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

module.exports = User = mongoose.model('items', ItemSchema);