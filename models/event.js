const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      required: true
    },
    date: Date,
    location: {
      type: String,
      required: true
    },
    picture: {
      type: String
    },
    description: {
      type: String,
      maxlength: 200
    },
    creator: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  { timestamps: true }
);

// name of event: String, required
// - type of event: conference, hackathon, coffee, workshops, job fair/fast interviews
// - date of event
// - location of event
// - picture
// - attendees

const Event = mongoose.model('Event', schema);

module.exports = Event;
