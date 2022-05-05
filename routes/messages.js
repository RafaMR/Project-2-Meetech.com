const exppress = require('express');
const Message = require('./../models/messages');
const Chat = require('../models/chat');
const routeGuard = require('./../middleware/route-guard');
const User = require('../models/user');

const messagesRouter = new exppress.Router();

//LIST OF MESSAGES ROUTES
//Get - messages: list of chats ✅
//Get - messages: with one user ❌

//Post - send a message within a chat ❌
//Post - delete a message within a chat ❌

messagesRouter.get('/:recipientId/:senderId', routeGuard, (req, res, next) => {
  const recipientId = req.params.recipientId;
  const senderId = req.params.senderId;
  let recipient;
  let sender;

  User.findById(recipientId)
    .then((recipientIGot) => {
      recipient = recipientIGot;
      return User.findById(senderId);
    })
    .then((senderIGot) => {
      sender = senderIGot;
      return Message.find({ recipient: recipientId, sender: senderId });
      //we need to include all the messages in which the current user is the recipient and the event creator is the sender as well. This can be done with the $or Mongoose operator, for which we need to check the syntax
    })
    .then((messagesIGot) => {
      res.render('messages', { recipient, sender, messages: messagesIGot });
    })
    .catch((error) => {
      next(error);
    });
});

messagesRouter.post('/:recipientId/:senderId', routeGuard, (req, res, next) => {
  const recipientId = req.params.recipientId;
  const senderId = req.params.senderId;
  const messageContent = req.body.message;
  const message = {
    message: messageContent,
    sender: senderId,
    recipient: recipientId
  };
  Message.create(message)
    .then(() => {
      res.redirect(`/messages/${recipientId}/${senderId}`);
    })
    .catch((error) => {
      next(error);
    });
});
/*
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
*/
module.exports = messagesRouter;
