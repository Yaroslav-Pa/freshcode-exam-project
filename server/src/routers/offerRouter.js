const offerRouter = require('express').Router({ mergeParams: true });
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const contestController = require('../controllers/contestController');
const upload = require('../utils/fileUpload');

// contests/:contestId/offers/
offerRouter.post(
  '/',
  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  contestController.setNewOffer
);

// contests/:contestId/offers/:offerId
offerRouter.put(
  '/:offerId',
  basicMiddlewares.onlyForCustomerWhoCreateContest,
  contestController.setOfferStatus
);

module.exports = offerRouter;
