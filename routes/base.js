'use strict';

const express = require('express');
const router = express.Router();
const routeGuard = require('./../middleware/route-guard');
const Event = require('./../models/event');
const Like = require('./../models/likes');

router.get('/', (req, res, next) => {
  let events;
  Event.find()
    .sort({ createdAt: -1 })
    .populate('creator')
    .then((eventDocs) => {
      events = eventDocs;
      if (!req.user) {
        res.render('home', { events });
      } else {
        const ids = events.map((event) => event._id);
        return Like.find({ event: { $in: ids }, user: req.user._id });
      }
    })
    .then((likes) => {
      console.log(likes);
      const mappedEvents = events.map((event) => {
        const liked = likes.some(
          (like) => String(like.event) === String(event._id)
        );
        return { ...event.toJSON(), liked };
      });
      res.render('home', { events: mappedEvents });
    })
    .catch((error) => {
      next(error);
    });
});

// router.get('/private', routeGuard, (req, res, next) => {
//   res.render('private');
// });

module.exports = router;
