'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
      //unique: true
    }
  ]
  // { timestamps: true }
});

const Chat = mongoose.model('Chat', schema);

module.exports = Chat;
