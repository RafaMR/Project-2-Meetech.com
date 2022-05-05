const express = require('express');
const Chat = require('./../models/chat');
const routeGuard = require('./../middleware/route-guard');

const chatRouter = express.Router();

//GET - '/chat' - Renders list of conversations
chatRouter.get('/:id', routeGuard, (req, res) => {
  const { id } = req.params;

  Chat.find({ participants: { $in: id } })
    .populate('participants')
    .then((chat) => {
      //let people
      //cond. statement, not equal to id
      // User.find() to get name and pass it to hbs along with chat
      res.render('messages', { chat });
    })
    .catch((error) => {
      console.log(error);
      next(new Error('Chats not found'));
    });
});

//http://localhost:3000/chat/626d38ff06b763b6c030922e/62714888ea50d635181b12bc
//POST - '/chat/new' - Creates a new chat
chatRouter.post('/:id/:user', (req, res) => {
  const { id } = req.params;
  const { user } = req.body;

  Chat.create({ participants: [id, user] })
    .then((chat) => {
      res.redirect(`/chat/${id}`);
    })
    .catch((error) => {
      console.log(error);
      next(new Error('Chat not created: duplicated?'));
    });
});

module.exports = chatRouter;