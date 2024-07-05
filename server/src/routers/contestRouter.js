const basicMiddlewares = require('../middlewares/basicMiddlewares');
const contestController = require('../controllers/contestController');
const upload = require('../utils/fileUpload');
const offerRouter = require('./offerRouter');
const contestRouter = require('express').Router();

// /contests/
contestRouter.get(
  '/',
  basicMiddlewares.onlyForCreative,
  contestController.getContests
);

// /contests/customers
contestRouter.get('/customers', contestController.getCustomerContests);

// /contests/data
contestRouter.get('/data', contestController.dataForContest);

// /contests/:contestId
contestRouter
  .route('/:contestId')
  .get(basicMiddlewares.canGetContest, contestController.getContestById)
  .put(upload.updateContestFile, contestController.updateContest)

// /contests/file/:fileName
contestRouter.get('/file/:fileName', contestController.downloadFile);

// /contests/:contestId/offers
contestRouter.use('/:contestId/offers', offerRouter);

module.exports = contestRouter;
