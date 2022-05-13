const exppress = require('express');
const Message = require('./../models/messages');
const routeGuard = require('./../middleware/route-guard');
const User = require('../models/user');

const messagesRouter = new exppress.Router();

messagesRouter.get('/:senderId', routeGuard, (req, res, next) => {
  const { senderId } = req.params;
  let sender;
  let recipient;

  User.findById(senderId)
    .then((senderIGot) => {
      sender = senderIGot;
      return Message.find({
        $or: [{ recipient: senderId }, { sender: senderId }]
      })
        .populate('sender')
        .populate('recipient');
    })
    .then((senderIGot) => {
      let newArray = []; // [...{id: id, name: name, myself: myself}]

      for (let i = 0; i < senderIGot.length; i++) {
        //If I am the sender, attach de recipient (if it doesnt already exist on newArray)
        if (String(senderIGot[i].sender._id) === senderId) {
          const newUserRecipient = {
            id: String(senderIGot[i].recipient._id),
            name: senderIGot[i].recipient.name,
            myself: senderId,
            city: senderIGot[i].recipient.city,
            jobTitle: senderIGot[i].recipient.jobTitle,
            picture: senderIGot[i].recipient.picture
          };
          if (!newArray.includes(newUserRecipient)) {
            newArray.push(newUserRecipient);
          }
          //If I am the recipient, attach de sender (if it doesnt already exist on newArray)
        } else if (String(senderIGot[i].recipient._id) === senderId) {
          const newUserSender = {
            id: String(senderIGot[i].sender._id),
            name: senderIGot[i].sender.name,
            myself: senderId,
            city: senderIGot[i].sender.city,
            jobTitle: senderIGot[i].sender.jobTitle,
            picture: senderIGot[i].sender.picture
          };

          if (!newArray.includes(newUserSender)) {
            newArray.push(newUserSender);
          }
        }
      }

      const filtered = newArray.filter((item) => item.id !== item.myself);

      const anotherOne = filtered.filter(
        (v, i, a) =>
          a.findIndex((v2) => JSON.stringify(v2) === JSON.stringify(v)) === i
      );

      return anotherOne;
    })
    .then((anotherOne) => {
      res.render('conversations', {
        anotherOne
      });
    })
    .catch((error) => {
      next(new Error('COULD_NOT_RETRIEVE_CHATS'));
    });
});

messagesRouter.get('/:recipientId/:senderId', routeGuard, (req, res, next) => {
  const { recipientId } = req.params;
  const { senderId } = req.params;
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
    })
    .then((messagesIGot) => {
      res.render('messages', { recipient, sender, messages: messagesIGot });
    })
    .catch((error) => {
      next(new Error('COULD_NOT_LOAD_MESSAGES'));
    });
});

messagesRouter.post('/:recipientId/:senderId', routeGuard, (req, res, next) => {
  const { recipientId, senderId } = req.params;
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
      next(new Error('COULD_NOT_SEND_MESSAGE'));
    });
});

module.exports = messagesRouter;
