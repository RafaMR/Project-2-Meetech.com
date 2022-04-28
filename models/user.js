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
    trim: true
  },
  passwordHashAndSalt: {
    type: String
  },
  picture: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: true
  },
  zipCode: {
    type: String,
    required: false
  },
  linkedIn: {
    type: String,
    required: false
  },
  jobTitle: {
    type: String,
    required: false
  }
});

const User = mongoose.model('User', schema);

module.exports = User;
