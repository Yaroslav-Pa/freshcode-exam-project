const contestRouter = require('express').Router();
const contestController = require('../controllers/contestController');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const upload = require('../utils/fileUpload');

// GET http://localhost:5000/contests/customers
contestRouter.get(
  '/customers',
  contestController.getCustomersContests
);

// GET http://localhost:5000/contests/1234
contestRouter.get(
  '/:contestId',
  basicMiddlewares.canGetContest,
  contestController.getContestById
);

contestRouter.get(
  '/',
  basicMiddlewares.onlyForCreative,
  contestController.getContests
);

contestRouter.put(
  '/:contestId',
  upload.updateContestFile,
  contestController.updateContest
);

module.exports = contestRouter;
