const catalogRouter = require('express').Router();
const chatController = require('../controllers/chatController');

// /chats/catalogs
catalogRouter
  .route('/')
  .get(chatController.getCatalogs)
  .post(chatController.createCatalog);

// chats/catalogs/:catalogId
catalogRouter
  .route('/:catalogId')
  .put(chatController.updateNameCatalog)
  .delete(chatController.deleteCatalog);

module.exports = catalogRouter;
