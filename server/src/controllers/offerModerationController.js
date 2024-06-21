const { OFFER_STATUS } = require('../constants');
const db = require('../db/models');
const ServerError = require('../errors/ServerError');

module.exports.getAllOffersOnReview = async (req, res, next) => {
  try {
    const {
      query: { limit, offset },
    } = req;

    const offers = await db.Offer.findAll({
      where: { status: OFFER_STATUS.REVIEW },
      limit,
      offset: offset || 0,
      order: [['id', 'ASC']],
    });

    res.send(offers);
  } catch (error) {
    next(new ServerError('Cannot get offers on review'));
  }
};

module.exports.updateOfferStatus = async (req, res, next) => {
  try {
    const {
      param: { offerId },
      body: { status },
    } = req;

    const offer = await db.Offer.update(
      { status },
      {
        where: { id: offerId },
        returning: true,
      }
    );

    res.send(offer);
  } catch (error) {
    next(new ServerError('Cannot get offers on review'));
  }
};
