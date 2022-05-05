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
      required: true,
      ref: 'User'
    },
    recipient: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    createdAt: {
      time: Date
    },
    updatedAt: {
      time: Date
    }
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', schema);

module.exports = Message;
