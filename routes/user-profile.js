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
    const { _id } = req.user;
    const { name, email, city, zipCode, jobTitle, linkedIn } = req.body;
    let picture;
    if (req.file) {
      picture = req.file.path;
    }
    User.findByIdAndUpdate(_id, {
      name,
      email,
      city,
      zipCode,
      jobTitle,
      linkedIn,
      picture
    })
      .then(() => {
        res.redirect(`/user-profile/${_id}`);
      })
      .catch((error) => {
        next(new Error('PROFILE_NOT_EDITED'));
      });
  }
);

profileRouter.get('/:id', (req, res, next) => {
  const { id } = req.params;
  let user;
  User.findById(id)
    .then((userInfo) => {
      console.log(userInfo);
      visitedUser = userInfo;
      if (!visitedUser) {
        throw new Error('PROFILE_NOT_FOUND');
      } else {
        return Event.find({ creator: id }).sort({ createdAt: -1 });
      }
    })
    .then((events) => {
      let userIsOwner = req.user && String(req.user._id) === id;
      //console.log(visitedUser);
      res.render('user-profile', {
        visitedUser,
        events,
        userIsOwner,
        loggedUserId: req.user._id
      });
    })
    .catch((error) => {
      next(new Error('PROFILE_NOT_FOUND'));
    });
});

//profileRouter.post('/delete', routeGuard, (req, res, next) => {
//  const { _id } = req.user;
//  User.findByIdAndRemove(_id)
//    .then(() => {
//      res.redirect('/');
//    })
//    .catch((error) => {
//      next(new Error('EVENT_NOT_DELETED'));
//    });
//});

module.exports = profileRouter;
