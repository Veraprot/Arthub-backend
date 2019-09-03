const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
  image: {
    type: String,
    required: true
  },

  description: {
    type: String, 
    required: true
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },

  reviews: [
    { 
      type: Schema.Types.ObjectId,
      ref: 'reviews'
    }
  ]
});

module.exports = User = mongoose.model('items', ItemSchema);