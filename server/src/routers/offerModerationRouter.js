const offerReviewRouter = require('express').Router();
const offerController = require('../controllers/offerModerationController');
// moderation/offers/
offerReviewRouter.get('/', offerController.getAllOffersOnReview);

// moderation/offers/:offerId
offerReviewRouter.put('/:offerId', offerController.updateOfferReviewStatus);

module.exports = offerReviewRouter;
