const checkToken = require('../middlewares/checkToken');
const userRouter = require('express').Router();
const validators = require('../middlewares/validators');
const userController = require('../controllers/userController');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const upload = require('../utils/fileUpload');
const transactionHistoryRouter = require('./transactionHistoryRouter');

// /user/
userRouter.get('/', checkToken.checkAuth);

// /user/registration
userRouter.post(
  '/registration',
  validators.validateRegistrationData,
  userController.registration
);

// /user/login
userRouter.post('/login', validators.validateLogin, userController.login);



userRouter.use(checkToken.checkToken);

// /user/update
userRouter.put('/update', upload.uploadAvatar, userController.updateUser);

// /user/pay
userRouter.post(
  '/pay',
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  userController.payment
);

// /user/cashout
userRouter.post(
  '/cashout',
  basicMiddlewares.onlyForCreative,
  userController.cashout
);

// /user/transactionHistory
userRouter.use('/transactionHistory', transactionHistoryRouter);

//TODO? maybe change it
// /user/:creatorId/offers/:offerId/changeMark
userRouter.post(
  '/:creatorId/offers/:offerId/changeMark',
  basicMiddlewares.onlyForCustomer,
  userController.changeMark
);

module.exports = userRouter;
