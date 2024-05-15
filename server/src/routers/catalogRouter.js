const catalogRouter = require('express').Router();
const chatController = require('../controllers/chatController');
const checkToken = require('../middlewares/checkToken');

catalogRouter.post('/createCatalog', chatController.createCatalog);

catalogRouter.post('/updateNameCatalog', chatController.updateNameCatalog);

catalogRouter.post('/addNewChatToCatalog', chatController.addNewChatToCatalog);

catalogRouter.post(
  '/removeChatFromCatalog',
  chatController.removeChatFromCatalog
);

catalogRouter.post('/deleteCatalog', chatController.deleteCatalog);

catalogRouter.post('/getCatalogs', chatController.getCatalogs);

module.exports = catalogRouter;
