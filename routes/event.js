const exppress = require('express');

const eventRouter = new exppress.Router();

//GET - '/event/' - Renders random events?

//GET - '/event/create' - Renders event creation page
eventRouter.get('/event/create', (req, res) => {
  res.render('event-create');
});

//POST - '/event/create' - Handles new event creation
//
//GET - '/event/:id/edit' - Loads events from database, renders event edit page
//
//POST - '/event/:id/edit' - Handles edit form submission.
//POST - '/event/:id/delete' - Handles deletion.

module.exports = eventRouter;
