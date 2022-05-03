const exppress = require('express');
const Message = require('./../models/messages');
const routeGuard = require('./../middleware/route-guard');

const messagesRouter = new exppress.Router();

//GET - '/messages/' - Renders list of conversations
messagesRouter.get('/', (req, res) => {
  res.render('messages');
});

//GET - '/messages/:recipient' - Look for a user to send a message

//POST - '/messages/new' - Handles new chat creation
messagesRouter.post('/messages/new', routeGuard, (req, res, next) => {
  const { message, sender, recipient, createdAt, updatedAt } = req.body;
  Message.create({
    message,
    sender,
    recipient,
    createdAt,
    updatedAt
  })
    .then(() => {
      res.redirect('/messages/:recipient');
    })
    .catch((error) => {
      next(error);
    });
});

// GET - '/messages/:id' - Loads messages between two users
messagesRouter.get('messages/:id', (req, res, next) => {
  const { id } = req.params;
  Message.findById(id)
    .populate('recipient')
    .then((chat) => {
      let userIsOwner =
        req.user && String(req.user._id) === String(event.creator._id);
      res.render('messages-user', { chat, userIsOwner });
    })
    .catch((error) => {
      console.log(error);
      next(new Error('EVENT_NOT_FOUND'));
    });
});

//POST - '/message/:recipient/:id' - Handles deletion.
messagesRouter.post('/:id/delete', routeGuard, (req, res, next) => {
  const { id } = req.params;
  Message.findOneAndDelete({ _id: id, recipient: req.user._id })
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = messagesRouter;
