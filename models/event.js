const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
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
    },
    likeCount: {
      type: Number,
      required: true,
      default: 0
    },
    attendees: [{ type: mongoose.Types.ObjectId, ref: 'User' }]
    // following: [{ type: ObjectId, ref: 'User' }]
  },
  { timestamps: true }
);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
