const basicMiddlewares = require('../middlewares/basicMiddlewares');
const contestController = require('../controllers/contestController');
const upload = require('../utils/fileUpload');
const contestRouter = require('express').Router();

contestRouter.post(
  '/',
  basicMiddlewares.onlyForCreative,
  contestController.getContests,
);

contestRouter.post('/customers/getCustomersContests', contestController.getCustomersContests);

contestRouter
  .route('/getContestById') //! 
  .get(basicMiddlewares.canGetContest, contestController.getContestById)
  .put(upload.updateContestFile, contestController.updateContest); //TODO

module.exports = contestRouter;
