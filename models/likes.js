const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  event: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Event'
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
