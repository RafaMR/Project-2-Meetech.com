'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true
  },
  passwordHashAndSalt: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    default: '/images/default.png'
  },
  city: {
    type: String,
    required: true
  },
  zipCode: {
    type: String
  },
  linkedIn: {
    type: String
  },
  jobTitle: {
    type: String
  }
});

const User = mongoose.model('User', schema);

module.exports = User;
