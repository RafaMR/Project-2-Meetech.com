const express = require('express');
const User = require('./../models/user');
const routeGuard = require('./../middleware/route-guard');
const fileUpload = require('./../middleware/file-upload');
const Event = require('../models/event');

const profileRouter = new express.Router();

profileRouter.get('/edit', routeGuard, (req, res, next) => {
  res.render('user-profile-edit', { profile: req.user });
});

profileRouter.post(
  '/edit',
  routeGuard,
  fileUpload.single('picture'),
  (req, res, next) => {
    const id = req.user._id;
    const { name, email, city, zipCode, jobTitle, linkedIn } = req.body;
    let picture;
    if (req.file) {
      picture = req.file.path;
    }
    User.findByIdAndUpdate(id, {
      name,
      email,
      city,
      zipCode,
      jobTitle,
      linkedIn,
      picture
    })
      .then(() => {
        res.redirect(`/user-profile/${id}`);
      })
      .catch((error) => {
        next(error);
      });
  }
);

profileRouter.get('/:id', (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  let user;
  User.findById(id)
    .then((userInfo) => {
      user = userInfo;
      if (!user) {
        throw new Error('PROFILE_NOT_FOUND');
      } else {
        return Event.find({ creator: id }).sort({ createdAt: -1 });
      }
    })
    .then((events) => {
      let userIsOwner = req.user && String(req.user._id) === id;
      res.render('user-profile', { user, events, userIsOwner });
    })
    .catch((error) => {
      console.log(error);
      next(new Error('PROFILE_NOT_FOUND'));
    });
});

profileRouter.post('/delete', routeGuard, (req, res, next) => {
  const id = req.user._id;
  User.findByIdAndRemove(id)
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = profileRouter;
