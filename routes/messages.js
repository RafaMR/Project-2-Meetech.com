const exppress = require('express');
const Message = require('./../models/messages');
const Chat = require('../models/chat');
const routeGuard = require('./../middleware/route-guard');

const messagesRouter = new exppress.Router();

//LIST OF MESSAGES ROUTES
//Get - messages: list of chats ✅
//Get - messages: with one user ❌

//Post - send a message within a chat ❌
//Post - delete a message within a chat ❌

messagesRouter.get('/', (req, res) => {
  res.render('messages');
});

// //GET - '/messages/:recipient' - Views chat with a user

// messagesRouter.get('/:recipient', (req, res, next) => {
//   const { id } = req.params;
//   Message.findById(id)
//     .populate('recipient')
//     .then((chat) => {
//       //let userIsOwner = req.user && String(req.user._id) === String(event.creator._id);
//       res.render('messages-user', { chat });
//     })
//     .catch((error) => {
//       console.log(error);
//       next(new Error('Chat not found'));
//     });
// });

//POST - '/messages/new' - Handles new message creation
messagesRouter.post('/new', routeGuard, (req, res, next) => {
  const { message, sender, recipient, createdAt, updatedAt } = req.body;
  Message.create({
    message,
    sender,
    recipient,
    createdAt,
    updatedAt
  })
    .then(() => {
      res.redirect('/:recipient');
    })
    .catch((error) => {
      next(error);
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
