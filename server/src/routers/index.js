const express = require('express');
const {
  findUserById,
  getUserIdFromToken,
  isSamePerson,
} = require('../middlewares/userMW');
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
const transactionHistoryRouter = require('./transactionHistoryRouter');
const router = express.Router();

router.post('/getUser', checkToken.checkAuth);

router.post(
  '/registration',
  validators.validateRegistrationData,
  hashPass,
  userController.registration
);

router.post('/login', validators.validateLogin, userController.login);

router.use(checkToken.checkToken);

router.use(
  '/transactionHistory/',
  // findUserById,
  // getUserIdFromToken,
  // isSamePerson,
  transactionHistoryRouter
);

router.use('/contests', contestRouter);

router.use('/', userRouter);

//! напевно також у контест роутер
router.post(
  '/dataForContest',
  checkToken.checkToken,
  contestController.dataForContest
);

router.get(
  '/downloadFile/:fileName',
  checkToken.checkToken,
  contestController.downloadFile
);

router.post(
  '/setNewOffer',
  checkToken.checkToken,
  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  contestController.setNewOffer
);

router.post(
  '/setOfferStatus',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomerWhoCreateContest,
  contestController.setOfferStatus
);

router.use('/', chatRouter);

router.use('/', catalogRouter);

module.exports = router;
