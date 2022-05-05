'use strict';

const { Router } = require('express');
const nodemailer = require('nodemailer');
const bcryptjs = require('bcryptjs');
const User = require('./../models/user');
const fileUpload = require('./../middleware/file-upload');

const transporter = nodemailer.createTransport({
  name: 'example.com',
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: process.env.EMAIL_SENDER,
//     pass: process.env.EMAIL_PASSWORD
//   }
// });

const router = new Router();

router.get('/sign-up', (req, res, next) => {
  res.render('sign-up');
});

router.post('/sign-up', fileUpload.single('picture'), (req, res, next) => {
  const { name, email, password, city, zipCode, jobTitle, linkedIn } = req.body;
  let picture;
  if (req.file) {
    picture = req.file.path;
  }
  bcryptjs
    .hash(password, 10)
    .then((hash) => {
      return User.create({
        name,
        email,
        passwordHashAndSalt: hash,
        city,
        zipCode,
        jobTitle,
        linkedIn
      });
    })
    .then((user) => {
      req.session.userId = user._id;
      const id = user._id;
      return transporter.sendMail({
        from: `"Meetech" ${process.env.EMAIL}`,
        to: user.email,
        subject: 'Welcome',
        text: 'Welcome to Meetech-app'
      });
      // res.redirect(`/user-profile/${id}`);
    })
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/sign-in', (req, res, next) => {
  res.render('sign-in');
});

router.post('/sign-in', (req, res, next) => {
  let user;
  const { email, password } = req.body;
  User.findOne({ email })
    .then((document) => {
      if (!document) {
        return Promise.reject(new Error("There's no user with that email."));
      } else {
        user = document;
        return bcryptjs.compare(password, user.passwordHashAndSalt);
      }
    })
    .then((result) => {
      if (result) {
        req.session.userId = user._id;
        const id = user._id;
        res.redirect(`/user-profile/${id}`);
      } else {
        return Promise.reject(new Error('Wrong password.'));
      }
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/sign-out', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
