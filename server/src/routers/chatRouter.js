const chatRouter = require('express').Router();
const chatController = require('../controllers/chatController');

chatRouter.post('/newMessage', chatController.addMessage);

chatRouter.post('/getChat', chatController.getChat);

chatRouter.post('/getPreview', chatController.getPreview);

chatRouter.post('/blackList', chatController.blackList);

chatRouter.post('/favorite', chatController.favoriteChat);

module.exports = chatRouter;
