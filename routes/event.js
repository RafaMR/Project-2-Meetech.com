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
    const { name, type, date, description, location } = req.body;
    // IF there is a picture,
    // store the url in the picture variable
    let picture;
    if (req.file) {
      picture = req.file.path;
    }
    // Call create method on Publication model
    Event.create({
      picture,
      name,
      type,
      date,
      description,
      location,
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

//GET - '/event/:id/edit' - Loads events from database, renders event edit page
//
//POST - '/event/:id/edit' - Handles edit form submission.
//POST - '/event/:id/delete' - Handles deletion.

module.exports = eventRouter;
