'use strict';

const express = require('express');
const router = express.Router();
const routeGuard = require('./../middleware/route-guard');
const Event = require('./../models/event');

router.get('/', (req, res, next) => {
  Event.find()
    .sort({ createdAt: -1 })
    .populate('creator')
    .then((events) => {
      res.render('home', { events });
    })
    .catch((error) => {
      next(error);
    });
});

// router.get('/private', routeGuard, (req, res, next) => {
//   res.render('private');
// });

module.exports = router;
