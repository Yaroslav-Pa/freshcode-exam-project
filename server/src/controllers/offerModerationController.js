const { OFFER_STATUS } = require('../constants');
const db = require('../db/models');
const EmailSendError = require('../errors/EmailSendError');
const ServerError = require('../errors/ServerError');
const {
  transporter,
  mailOptions,
  mailErrorHandler,
} = require('../utils/mailer');

module.exports.getAllOffersOnReview = async (req, res, next) => {
  try {
    const {
      query: { limit, offset },
    } = req;

    const offers = await db.Offer.findAll({
      where: { status: OFFER_STATUS.REVIEW },
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
    res.send({ offers, haveMore: limit ? offers.length === +limit : false });
  } catch (error) {
    next(new ServerError('Cannot get offers on review'));
  }
};

module.exports.updateOfferReviewStatus = async (req, res, next) => {
  try {
    const {
      params: { offerId },
      body: { status },
    } = req;

    const [count, [updatedOffer]] = await db.Offer.update(
      { status },
      {
        where: { id: offerId },
        returning: true,
      }
    );
    
    const offer = await db.Offer.findOne({
      where: { id: offerId },
      include: [
        {
          model: db.User,
          required: true,
          attributes: {
            exclude: ['password', 'role', 'balance', 'accessToken'],
          },
        },
      ],
    });

    res.send(updatedOffer);

    transporter.sendMail(
      mailOptions(
        offer.User.email,
        status,
        `${offer.User.firstName} ${offer.User.lastName}`
      ),
      (error) => {
        mailErrorHandler(error, next);
      }
    );
  } catch (error) {
    next(new ServerError('Cannot update state of the offer'));
  }
};
