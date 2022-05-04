'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
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
      time: Date
    },
    updatedAt: {
      time: Date
    },
    chatId: {
      type: mongoose.Types.ObjectId
    }
  },
  { timestamps: true }
);

const Messages = mongoose.model('Messages', schema);

module.exports = Messages;
