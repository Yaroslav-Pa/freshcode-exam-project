const offerRouter = require('express').Router({ mergeParams: true });
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const contestController = require('../controllers/contestController');
const upload = require('../utils/fileUpload');

// contests/:contestId/offers/
offerRouter.post(
  '/',
  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  contestController.createNewOffer
);

// contests/:contestId/offers/:offerId
offerRouter.put(
  '/:offerId',
  basicMiddlewares.onlyForCustomerWhoCreateContest,
  contestController.setFinalStatus
);

module.exports = offerRouter;
