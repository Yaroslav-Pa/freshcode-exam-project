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
      //TODO! if limit = undefiend then request will return empty data so need to fix it later
      limit: limit || null,
      offset: offset || 0,
      order: [['id', 'ASC']],
      include: [
        {
          model: db.User,
          required: true,
          attributes: {
            exclude: ['password', 'role', 'balance', 'accessToken'],
          },
        },
        {
          model: db.Rating,
          required: false,
          attributes: { exclude: ['userId', 'offerId'] },
        },
      ],
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
