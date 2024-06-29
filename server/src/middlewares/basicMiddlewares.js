const db = require('../db/models');
const NotFound = require('../errors/UserNotFoundError');
const RightsError = require('../errors/RightsError');
const ServerError = require('../errors/ServerError');
const CONSTANTS = require('../constants');

module.exports.parseBody = (req, res, next) => {
  const newContests = JSON.parse(req.body.contests);
  newContests.forEach((contest) => {
    if (contest.haveFile) {
      const file = req.files.splice(0, 1);
      contest.fileName = file[0].filename;
      contest.originalFileName = file[0].originalname;
    }
  });
  req.body.contests = newContests;
  next();
};
module.exports.canGetContest = async (req, res, next) => {
  let result = null;
  try {
    const {
      params: { contestId },
      tokenData: { role, userId },
    } = req;
    const contestIdInt = +contestId;
    if (role === CONSTANTS.CUSTOMER) {
      result = await db.Contest.findOne({
        where: { id: contestIdInt, userId },
      });
    } else if (role === CONSTANTS.CREATOR) {
      result = await db.Contest.findOne({
        where: {
          id: contestIdInt,
          status: {
            [db.Sequelize.Op.or]: [
              CONSTANTS.CONTEST_STATUS_ACTIVE,
              CONSTANTS.CONTEST_STATUS_FINISHED,
            ],
          },
        },
      });
    }
    result ? next() : next(new RightsError());
  } catch (e) {
    next(new ServerError(e.message));
  }
};

module.exports.onlyForCreative = (req, res, next) => {
  if (req.tokenData.role !== CONSTANTS.CREATOR) {
    next(new RightsError('this page request for creatives'));
  } else {
    next();
  }
};

module.exports.onlyForCustomer = (req, res, next) => {
  if (req.tokenData.role !== CONSTANTS.CUSTOMER) {
    return next(new RightsError('this request only for customers'));
  } else {
    next();
  }
};

module.exports.onlyForModerator = (req, res, next) => {
  if (req.tokenData.role !== CONSTANTS.MODERATOR) {
    return next(new RightsError('this request only for moderators'));
  } else {
    next();
  }
};

module.exports.canSendOffer = async (req, res, next) => {
  const {
    params: { contestId },
    tokenData: { role },
  } = req;
  const contestIdInt = +contestId;
  if (role === CONSTANTS.CUSTOMER) {
    return next(new RightsError());
  }
  try {
    const result = await db.Contest.findOne({
      where: {
        id: contestIdInt,
      },
      attributes: ['status'],
    });

    //TODO навіщо робити тут 2 запити, напевно status можна й просто дістати?
    //* глянути через console.log(result)
    if (
      result.get({ plain: true }).status === CONSTANTS.CONTEST_STATUS_ACTIVE
    ) {
      next();
    } else {
      return next(new RightsError());
    }
  } catch (e) {
    next(new ServerError());
  }
};

module.exports.onlyForCustomerWhoCreateContest = async (req, res, next) => {
  try {
    const {
      params: { contestId },
      tokenData: { userId },
    } = req;
    const contestIdInt = +contestId;
    const result = await db.Contest.findOne({
      where: {
        userId,
        id: contestIdInt,
        status: CONSTANTS.CONTEST_STATUS_ACTIVE,
      },
    });
    if (!result) {
      return next(new RightsError());
    }
    next();
  } catch (e) {
    next(new ServerError());
  }
};

//TODO? не використовується
module.exports.canUpdateContest = async (req, res, next) => {
  try {
    const {
      params: { contestId },
      tokenData: { userId },
    } = req;
    const contestIdInt = +contestId;
    const result = db.Contest.findOne({
      where: {
        userId,
        id: contestIdInt,
        status: { [db.Sequelize.Op.not]: CONSTANTS.CONTEST_STATUS_FINISHED },
      },
    });
    if (!result) {
      return next(new RightsError());
    }
    next();
  } catch (e) {
    next(new ServerError());
  }
};
