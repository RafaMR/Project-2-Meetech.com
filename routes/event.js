const express = require('express');
const Event = require('./../models/event');
const User = require('./../models/user');
const Like = require('./../models/likes');
const RSVP = require('./../models/rsvp');
const routeGuard = require('./../middleware/route-guard');
const fileUpload = require('./../middleware/file-upload');

const eventRouter = new express.Router();

//GET - '/event/' - Renders random events?

//GET - '/event/create' - Renders event creation page
eventRouter.get('/create', (req, res) => {
  res.render('event-create');
});

//POST - '/event/create' - Handles new event creation
eventRouter.post(
  '/create',
  routeGuard,
  fileUpload.single('picture'),
  (req, res, next) => {
    const { name, type, date, location, description } = req.body;
    let picture;
    if (req.file) {
      picture = req.file.path;
    }
    Event.create({
      name,
      type,
      date,
      location,
      picture,
      description,
      creator: req.user._id
    })
      .then(() => {
        res.redirect('/');
      })
      .catch((error) => {
        next(error);
      });
  }
);

/*
// GET - '/event/:id' - Loads event from database, renders single event page
eventRouter.get('/:id', (req, res, next) => {
  let attendingUsers;
  const { id } = req.params;
  RSVP.find({ event: id })
    .populate('user')
    .then((attendances) => {
      attendingUsers = attendances;
      return Event.findById(id);
    })
    //.populate('creator')
    .then((event) => {
      let userIsOwner =
        req.user && String(req.user._id) === String(event.creator._id);
      res.render('event-single', { event, userIsOwner, attendingUsers });
    })
    .catch((error) => {
      console.log(error);
      next(new Error('EVENT_NOT_FOUND'));
    });
});
*/

eventRouter.get('/:id', (req, res, next) => {
  let attendingUsers;
  const { id } = req.params;
  RSVP.find({ event: id })
    .populate('user')
    .then((attendances) => {
      attendingUsers = attendances;
      Event.findById(id)
        .populate('creator')
        .then((event) => {
          let userIsOwner =
            req.user && String(req.user._id) === String(event.creator._id);
          console.log(attendingUsers);
          const attendingUsersIds = attendingUsers.map((eachUser) => {
            return String(eachUser.user._id);
          });
          console.log(attendingUsersIds);
          let userIsAttending =
            req.user && attendingUsersIds.includes(String(req.user._id));
          res.render('event-single', {
            event,
            userIsOwner,
            attendingUsers,
            userIsAttending,
            loggedInUser: req.user
          });
        });
    })
    .catch((error) => {
      console.log(error);
      next(new Error('EVENT_NOT_FOUND'));
    });
});

//GET - '/event/:id/edit' - Loads events from database, renders event edit page
eventRouter.get('/:id/edit', routeGuard, (req, res, next) => {
  const { id } = req.params;
  Event.findOne({ _id: id, creator: req.user._id })
    .then((event) => {
      if (!event) {
        throw new Error('PUBLICATION_NOT_FOUND');
      } else {
        res.render('event-edit', { event });
      }
    })
    .catch((error) => {
      next(error);
    });
});

//POST - '/event/:id/edit' - Handles edit form submission.
eventRouter.post(
  '/:id/edit',
  routeGuard,
  fileUpload.single('picture'),
  (req, res, next) => {
    const { id } = req.params;
    const { name, type, date, location, description } = req.body;
    let picture;
    if (req.file) {
      picture = req.file.path;
    }
    Event.findOneAndUpdate(
      { _id: id, creator: req.user._id },
      { name, type, date, location, picture, description }
    )
      .then(() => {
        res.redirect(`/event/${id}`);
      })
      .catch((error) => {
        next(error);
      });
  }
);

//POST - '/event/:id/delete' - Handles deletion.

eventRouter.post('/:id/delete', routeGuard, (req, res, next) => {
  const { id } = req.params;
  Event.findOneAndDelete({ _id: id, creator: req.user._id })
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});

eventRouter.post('/:id/like', routeGuard, (req, res, next) => {
  const { id } = req.params;
  Like.findOne({ event: id, user: req.user._id })
    .then((like) => {
      if (like) {
        throw new Error('ALREADY_LIKED');
      } else {
        return Like.create({ event: id, user: req.user._id });
      }
    })

    .then(() => {
      return Like.count({ event: id });
    })
    .then((likeCount) => {
      console.log(likeCount);
      return Event.findByIdAndUpdate(id, { likeCount });
    })
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});

eventRouter.post('/:id/unlike', routeGuard, (req, res, next) => {
  const { id } = req.params;
  Like.findOneAndDelete({ event: id, user: req.user._id })
    .then(() => {
      return Like.count({ event: id });
    })
    .then((likeCount) => {
      console.log(likeCount);
      return Event.findByIdAndUpdate(id, { likeCount });
    })
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});

eventRouter.post('/:id/attend', routeGuard, (req, res, next) => {
  const { id } = req.params;
  RSVP.findOne({ event: id, user: req.user._id })
    .then((isrsvp) => {
      if (isrsvp) {
        throw new Error('ALREADY_ATTENDING');
      } else {
        return RSVP.create({ event: id, user: req.user._id });
      }
    })
    .then((result) => {
      res.redirect(`/event/${id}`);
    })
    .catch((error) => {
      next(error);
    });
});

eventRouter.post('/:id/notattend', routeGuard, (req, res, next) => {
  const { id } = req.params;
  RSVP.findOneAndRemove({ event: id, user: req.user._id })
    .then((result) => {
      res.redirect(`/event/${id}`);
    })
    .catch((error) => {
      next(error);
    });
});

// eventRouter.post('/:id/attend', routeGuard, (req, res, next) => {
//   const eventId = req.params.id;
//   Event.findById(eventId)
//     .then((event) => {
// if (
//   event.attendees.filter(
//     (attendee) => attendee.user.toString() === req.user._id
//   ).length > 0
// ) {
//   return res
//     .status(400)
//     .json({ alreadyfollow: 'You already followed the user' });
// }
//       return res
//         .status(400)
//         .json({
//           filtered: event.attendees.filter((attendee) => attendee.user)
//         });

//       event.attendees.unshift(req.user._id);
//       event
//         .save()
//         // .then((event) => res.render('event-single', { event }));
//         .then((event) => res.json(event));
//     })
//     .catch((error) => {
//       next(error);
//     });
// });

// eventRouter.post('/:id/attend', routeGuard, (req, res, next) => {
//   Event.findByIdAndUpdate(
//     req.body.attendId,
//     {
//       $push: { attendees: req.user._id }
//     },
//     {
//       new: true
//     }
//   )
//     .then(() => {
//       res.redirect('event-single');
//     })
//     .catch((error) => {
//       next(error);
//     });
// });

// User.findByIdAndUpdate(req.user._id,{
//     $push:{following:req.body.followId}

// },{new:true}).select("-password").then(result=>{
//     res.json(result)

module.exports = eventRouter;
