const express = require('express');
const validators = require('../middlewares/validators');
const hashPass = require('../middlewares/hashPassMiddle');
const userController = require('../controllers/userController');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const contestController = require('../controllers/contestController');
const checkToken = require('../middlewares/checkToken');
const upload = require('../utils/fileUpload');
const contestRouter = require('./contestRouter');
const catalogRouter = require('./catalogRouter');
const chatRouter = require('./chatRouter');
const userRouter = require('./userRouter');
const router = express.Router();

router.post(
  '/getUser',
  checkToken.checkAuth,
);

router.post(
  '/registration',
  validators.validateRegistrationData,
  hashPass,
  userController.registration,
);

router.post(
  '/login',
  validators.validateLogin,
  userController.login,
);

router.use(checkToken.checkToken);

router.use('/contests', contestRouter);

router.use('/', userRouter);
// router.post(
//   '/registration',
//   validators.validateRegistrationData,
//   hashPass,
//   userController.registration,
// );

// router.post(
//   '/login',
//   validators.validateLogin,
//   userController.login,
// );

// router.post(
//   '/pay',
//   checkToken.checkToken,
//   basicMiddlewares.onlyForCustomer,
//   upload.uploadContestFiles,
//   basicMiddlewares.parseBody,
//   validators.validateContestCreation,
//   userController.payment,
// );

// router.post(
//   '/changeMark',
//   checkToken.checkToken,
//   basicMiddlewares.onlyForCustomer,
//   userController.changeMark,
// );

// router.post(
//   '/updateUser',
//   checkToken.checkToken,
//   upload.uploadAvatar,
//   userController.updateUser,
// );

// router.post(
//   '/cashout',
//   checkToken.checkToken,
//   basicMiddlewares.onlyForCreative,
//   userController.cashout,
// );

// router.post(
//   '/getUser',
//   checkToken.checkAuth,
// );

//! напевно також у контест роутер
router.post(
  '/dataForContest',
  checkToken.checkToken,
  contestController.dataForContest,
);

router.get(
  '/downloadFile/:fileName',
  checkToken.checkToken,
  contestController.downloadFile,
);

router.post(
  '/setNewOffer',
  checkToken.checkToken,
  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  contestController.setNewOffer,
);

router.post(
  '/setOfferStatus',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomerWhoCreateContest,
  contestController.setOfferStatus,
);

router.use('/', chatRouter);

// router.post(
//   '/newMessage',
//   checkToken.checkToken,
//   chatController.addMessage,
// );

// router.post(
//   '/getChat',
//   checkToken.checkToken,
//   chatController.getChat,
// );

// router.post(
//   '/getPreview',
//   checkToken.checkToken,
//   chatController.getPreview,
// );

// router.post(
//   '/blackList',
//   checkToken.checkToken,
//   chatController.blackList,
// );

// router.post(
//   '/favorite',
//   checkToken.checkToken,
//   chatController.favoriteChat,
// );

router.use('/', catalogRouter);

// router.post(
//   '/createCatalog',
//   checkToken.checkToken,
//   chatController.createCatalog,
// );

// router.post(
//   '/updateNameCatalog',
//   checkToken.checkToken,
//   chatController.updateNameCatalog,
// );

// router.post(
//   '/addNewChatToCatalog',
//   checkToken.checkToken,
//   chatController.addNewChatToCatalog,
// );

// router.post(
//   '/removeChatFromCatalog',
//   checkToken.checkToken,
//   chatController.removeChatFromCatalog,
// );

// router.post(
//   '/deleteCatalog',
//   checkToken.checkToken,
//   chatController.deleteCatalog,
// );

// router.post(
//   '/getCatalogs',
//   checkToken.checkToken,
//   chatController.getCatalogs,
// );

module.exports = router;
