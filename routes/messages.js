const exppress = require('express');
const Message = require('./../models/messages');
const routeGuard = require('./../middleware/route-guard');
const User = require('../models/user');

const messagesRouter = new exppress.Router();

// TEST TO GET ALL THE MESSAGES FROM/TO ME
// Find all the NAMES in which my ID is either as sender or recipient
//Create a unique array
//Redirect to the get with myself and the other person

// messagesRouter.get('/:senderId', routeGuard, (req, res, next) => {
//   const senderId = req.params.senderId;
//   let sender;
//   let recipient;

//   User.findById(senderId)
//     .then(() => {
//       return User.findById(senderId);
//     })
//     .then((senderIGot) => {
//       sender = senderIGot;
//       return Message.find({
//         $or: [{ recipient: senderId }, { sender: senderId }]
//       });
//     })
//     .then((messagesIGot) => {
//       // to-do: exclude my own id
//       // make a unique array
//       res.render('conversations', {
//         recipient,
//         sender,
//         messages: messagesIGot
//       });
//     })
//     .catch((error) => {
//       next(error);
//     });
// });

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
      return Message.find({
        $or: [
          { recipient: recipientId, sender: senderId },
          { recipient: senderId, sender: recipientId }
        ]
      }).populate('sender');

      //we need to include all the messages in which the current user is the recipient and the event creator is the sender as well. This can be done with the $or Mongoose operator, for which we need to check the syntax
    })
    .then((messagesIGot) => {
      res.render('messages', { recipient, sender, messages: messagesIGot });
    })
    .catch((error) => {
      next(error);
    });
});

// Message validation failed: message: Path `message` is required.

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
