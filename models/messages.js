'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  sender: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  recipient: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  createdAt: {
    time: timestamp
  },
  updatedAt: {
    time: timestamp
  }
});

const User = mongoose.model('messages', schema);

module.exports = messages;
