const chatRouter = require('express').Router();
const chatController = require('../controllers/chatController');
const catalogRouter = require('./catalogRouter');

// /chats/
chatRouter.get('/', chatController.getPreview);

// /chats/blackList
chatRouter.put('/blackList', chatController.blackList);

// /chats/favorite
chatRouter.put('/favorite', chatController.favoriteChat);

chatRouter.use('/catalogs', catalogRouter);

// /chats/:chatId/
chatRouter.post('/:chatId', chatController.addNewChatToCatalog);
// /chats/:chatId/
chatRouter.delete('/:chatId', chatController.removeChatFromCatalog);

// /chats/:interlocutorId
chatRouter.get('/interlocutor/:interlocutorId', chatController.getChat);

// /chats/:interlocutorId
chatRouter.post('/interlocutor/:interlocutorId', chatController.addMessage);

module.exports = chatRouter;
