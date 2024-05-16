const basicMiddlewares = require('../middlewares/basicMiddlewares');
const contestController = require('../controllers/contestController');
const upload = require('../utils/fileUpload');
const contestRouter = require('express').Router();

// only user contests
contestRouter.get(
  '/customers',
  contestController.getCustomerContests
);

// all contests (creative)
contestRouter.get(
  '/',
  basicMiddlewares.onlyForCreative,
  contestController.getContests
);

contestRouter
  .route('/:contestId')
  .get(basicMiddlewares.canGetContest, contestController.getContestById)
  .put(upload.updateContestFile, contestController.updateContest);



module.exports = contestRouter;
