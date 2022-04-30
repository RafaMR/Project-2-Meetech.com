const exppress = require('express');
const Event = require('./../models/event');
const routeGuard = require('./../middleware/route-guard');
const fileUpload = require('./../middleware/file-upload');

const eventRouter = new exppress.Router();

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
        res.redirect('event-single');
      })
      .catch((error) => {
        next(error);
      });
  }
);

//GET - '/event/:id/edit' - Loads events from database, renders event edit page
eventRouter.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Event.findById(id)
    .populate('creator')
    .then((event) => {
      let userIsOwner =
        req.user && String(req.user._id) === String(event.creator._id);
      res.render('event-single', { event, userIsOwner });
    })
    .catch((error) => {
      console.log(error);
      next(new Error('PUBLICATION_NOT_FOUND'));
    });
});

//POST - '/event/:id/edit' - Handles edit form submission.
//POST - '/event/:id/delete' - Handles deletion.

module.exports = eventRouter;
