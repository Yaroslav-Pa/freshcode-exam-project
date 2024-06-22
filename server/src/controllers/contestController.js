const db = require('../db/models');
const ServerError = require('../errors/ServerError');
const contestQueries = require('./queries/contestQueries');
const userQueries = require('./queries/userQueries');
const controller = require('../socketInit');
const UtilFunctions = require('../utils/functions');
const CONSTANTS = require('../constants');
const { createTransact } = require('./queries/transactQueries');

module.exports.dataForContest = async (req, res, next) => {
  const response = {};
  try {
    const {
      query: { characteristic1, characteristic2 },
    } = req;
    const types = [characteristic1, characteristic2, 'industry'].filter(
      Boolean
    );

    const characteristics = await db.Select.findAll({
      where: {
        type: {
          [db.Sequelize.Op.or]: types,
        },
      },
    });
    if (!characteristics) {
      return next(new ServerError());
    }
    characteristics.forEach((characteristic) => {
      if (!response[characteristic.type]) {
        response[characteristic.type] = [];
      }
      response[characteristic.type].push(characteristic.describe);
    });
    res.send(response);
  } catch (err) {
    next(new ServerError('cannot get contest preferences'));
  }
};

module.exports.downloadFile = async (req, res, next) => {
  try {
    const {
      params: { fileName },
    } = req;
    const file = CONSTANTS.CONTESTS_DEFAULT_DIR + fileName;
    res.download(file);
  } catch (error) {
    next(error.message);
  }
};

module.exports.createNewOffer = async (req, res, next) => {
  const {
    params: { contestId },
    body: { offerData, customerId, contestType },
    tokenData,
    file,
  } = req;
  const obj = {};
  if (contestType === CONSTANTS.LOGO_CONTEST) {
    obj.fileName = file.filename;
    obj.originalFileName = file.originalname;
  } else {
    obj.text = offerData;
  }
  obj.userId = tokenData.userId;
  obj.contestId = contestId;
  try {
    const result = await contestQueries.createOffer(obj);
    delete result.contestId;
    delete result.userId;
    controller.getNotificationController().emitEntryCreated(customerId);
    const User = Object.assign({}, tokenData, { id: tokenData.userId });
    res.send(Object.assign({}, result, { User }));
  } catch (error) {
    return next(new ServerError(error.message));
  }
};

const rejectOffer = async (offerId, creatorId, contestId) => {
  const rejectedOffer = await contestQueries.updateOffer(
    { status: CONSTANTS.OFFER_STATUS_REJECTED },
    { id: offerId }
  );
  controller
    .getNotificationController()
    .emitChangeOfferStatus(
      creatorId,
      'Someone of yours offers was rejected',
      contestId
    );
  return rejectedOffer;
};

const resolveOffer = async (
  contestId,
  creatorId,
  orderId,
  offerId,
  priority,
  transaction
) => {
  const finishedContest = await contestQueries.updateContestStatus(
    {
      status: db.sequelize.literal(`   CASE
            WHEN "id"=${contestId}  AND "order_id"='${orderId}' THEN '${
        CONSTANTS.CONTEST_STATUS_FINISHED
      }'
            WHEN "order_id"='${orderId}' AND "priority"=${
        priority + 1
      }  THEN '${CONSTANTS.CONTEST_STATUS_ACTIVE}'
            ELSE '${CONSTANTS.CONTEST_STATUS_PENDING}'
            END
    `),
    },
    { orderId },
    transaction
  );
  await userQueries.updateUser(
    { balance: db.sequelize.literal('balance + ' + finishedContest.prize) },
    creatorId,
    transaction
  );
  await createTransact(
    creatorId,
    CONSTANTS.TRANSACTION_INCOME,
    finishedContest.prize
  );

  const updatedOffers = await contestQueries.updateOfferStatus(
    {
      status: db.sequelize.literal(` CASE
            WHEN "id"=${offerId} THEN '${CONSTANTS.OFFER_STATUS_WON}'
            ELSE '${CONSTANTS.OFFER_STATUS_REJECTED}'
            END
    `),
    },
    {
      contestId,
    },
    transaction
  );
  transaction.commit();
  const arrayRoomsId = [];
  updatedOffers.forEach((offer) => {
    if (
      offer.status === CONSTANTS.OFFER_STATUS_REJECTED &&
      creatorId !== offer.userId
    ) {
      arrayRoomsId.push(offer.userId);
    }
  });
  if (arrayRoomsId.length > 0) {
    controller
      .getNotificationController()
      .emitChangeOfferStatus(
        arrayRoomsId,
        'Someone of yours offers was rejected',
        contestId
      );
  }
  controller
    .getNotificationController()
    .emitChangeOfferStatus(creatorId, 'Someone of your offers WIN', contestId);
  return updatedOffers.find(
    (offer) => offer.dataValues.status === CONSTANTS.OFFER_STATUS_WON
  );
};

module.exports.setFinalStatus = async (req, res, next) => {
  const {
    params: { contestId, offerId },
    body: { command, creatorId, orderId, priority },
  } = req;
  if (command === 'reject') {
    try {
      const offer = await rejectOffer(offerId, creatorId, contestId);
      res.send(offer);
    } catch (err) {
      next(err);
    }
  } else if (command === 'resolve') {
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      const winningOffer = await resolveOffer(
        contestId,
        creatorId,
        orderId,
        offerId,
        priority,
        transaction
      );
      res.send(winningOffer);
    } catch (err) {
      transaction.rollback();
      next(err);
    }
  }
};

//* вище нічого не робив

//! Contests

module.exports.getCustomerContests = async (req, res, next) => {
  try {
    const {
      query: { limit, offset, status },
      tokenData: { userId },
    } = req;

    const contests = await db.Contest.findAll({
      where: { status, userId },
      limit,
      offset: offset || 0,
      order: [['id', 'DESC']],
      include: [
        {
          model: db.Offer,
          required: false,
          attributes: ['id'],
          where: {
            status: {
              [db.Sequelize.Op.notIn]: [
                CONSTANTS.OFFER_STATUS.REVIEW,
                CONSTANTS.OFFER_STATUS.FAIL_REVIEW,
              ],
            },
          },
        },
      ],
    });

    contests.forEach(
      (contest) => (contest.dataValues.count = contest.dataValues.Offers.length)
    );

    res.send({
      contests,
      haveMore: contests.length !== 0,
    });
  } catch (error) {
    next(new ServerError(error.message));
  }
};

module.exports.getContests = async (req, res, next) => {
  try {
    const {
      query: {
        contestId,
        limit,
        offset,
        typeIndex,
        industry,
        awardSort,
        ownEntries,
        onlyActiveStatus,
      },
      tokenData: { userId },
    } = req;

    const isActiveStatus = onlyActiveStatus === 'true';

    const { where, order } = UtilFunctions.createWhereForAllContests(
      typeIndex,
      contestId,
      industry,
      awardSort,
      isActiveStatus
    );

    const isOwnEntries = ownEntries === 'true';

    const contests = await db.Contest.findAll({
      where,
      order,
      limit,
      offset: offset || 0,
      include: [
        {
          model: db.Offer,
          required: isOwnEntries,
          where: isOwnEntries ? { userId } : {},
          attributes: ['id'],
        },
      ],
    });

    contests.forEach(
      (contest) => (contest.dataValues.count = contest.dataValues.Offers.length)
    );

    res.send({
      contests,
      haveMore: contests.length !== 0,
    });
  } catch (error) {
    next(new ServerError(error.message));
  }
};

module.exports.getContestById = async (req, res, next) => {
  try {
    const {
      params: { contestId },
      tokenData: { userId, role },
    } = req;

    let contestInfo = await db.Contest.findOne({
      where: { id: contestId },
      order: [[db.Offer, 'id', 'asc']],
      include: [
        {
          model: db.User,
          required: true,
          attributes: {
            exclude: ['password', 'role', 'balance', 'accessToken'],
          },
        },
        {
          model: db.Offer,
          required: false,
          where: role === CONSTANTS.CREATOR ? { userId } : {},
          attributes: { exclude: ['userId', 'contestId'] },
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
              where: { userId },
              attributes: { exclude: ['userId', 'offerId'] },
            },
          ],
        },
      ],
    });
    //TODO переробити
    contestInfo = contestInfo.get({ plain: true });
    let reviewCount = 0;
    let failReviewCount = 0;

    contestInfo.Offers = contestInfo.Offers.filter((offer) => {
      if (offer.Rating) {
        offer.mark = offer.Rating.mark;
      }
      delete offer.Rating;

      if (offer.status === CONSTANTS.OFFER_STATUS.REVIEW) {
        reviewCount++;
      } else if (offer.status === CONSTANTS.OFFER_STATUS.FAIL_REVIEW) {
        failReviewCount++;
      }

      if (role === CONSTANTS.CREATOR) {
        return offer;
      } else {
        return (
          offer.status !== CONSTANTS.OFFER_STATUS.REVIEW &&
          offer.status !== CONSTANTS.OFFER_STATUS.FAIL_REVIEW
        );
      }
    });
    res.send({ ...contestInfo, reviewCount, failReviewCount });
  } catch (error) {
    next(new ServerError(error.message));
  }
};

module.exports.updateContest = async (req, res, next) => {
  try {
    const {
      params: { contestId },
      file,
      body,
      tokenData: { userId },
    } = req;

    if (file) {
      body.fileName = file.filename;
      body.originalFileName = file.originalname;
    }

    const updatedContest = await contestQueries.updateContest(body, {
      id: contestId,
      userId,
    });
    res.send(updatedContest);
  } catch (error) {
    next(new ServerError(error.message));
  }
};
