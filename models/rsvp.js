const mongoose = require('mongoose');

const rsvpSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  event: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Event'
  }
});

const RSVP = mongoose.model('RSVP', rsvpSchema);

module.exports = RSVP;
