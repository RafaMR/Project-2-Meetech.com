const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  eventId: {
    type: mongoose.Types.ObjectId,
    required: true
  }
});

const Event = mongoose.model('RSVP', schema);

module.exports = rsvp;
