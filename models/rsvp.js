const mongoose = require('mongoose');
const User = require('./../models/user');
const Event = require('./../models/event');

const rsvpSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: User
  },
  eventId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: Event
  }
});

const RSVP = mongoose.model('RSVP', rsvpSchema);

module.exports = RSVP;
