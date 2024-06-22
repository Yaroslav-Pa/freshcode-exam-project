const offerReviewRouter = require('express').Router();
const offerController = require('../controllers/offerModerationController');
// offers/
offerReviewRouter.get('/', offerController.getAllOffersOnReview);

// offers/:offerId
offerReviewRouter.put('/:offerId', offerController.updateOfferReviewStatus);

module.exports = offerReviewRouter;
