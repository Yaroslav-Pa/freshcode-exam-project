const bd = require('../models');
const NotFound = require('../errors/UserNotFoundError');
const RightsError = require('../errors/RightsError');
const ServerError = require('../errors/ServerError');
const CONSTANTS = require('../constants');

module.exports.parseBody = (req, res, next) => {
  //!напевно навіть не потрібно
  //? map
  const newContests = JSON.parse(req.body.contests);
  for (let i = 0; i < newContests.length; i++) {
    if (newContests[i].haveFile) {
      const file = req.files.splice(0, 1);
      newContests[i].fileName = file[0].filename;
      newContests[i].originalFileName = file[0].originalname;
    }
  }
  req.body.contests = newContests;
  next();
};

module.exports.canGetContest = async (req, res, next) => {
  const {
    params: { contestId },
    tokenData: { role, userId },
  } = req;
  let result = null;
  try {
    if (role === CONSTANTS.CUSTOMER) {
      result = await bd.Contests.findOne({
        where: { id: contestId, userId },
      });
    } else if (role === CONSTANTS.CREATOR) {
      result = await bd.Contests.findOne({
        where: {
          id: contestId,
          status: {
            [bd.Sequelize.Op.or]: [
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
  if (req.tokenData.role === CONSTANTS.CUSTOMER) {
    next(new RightsError('this page only for creatives'));
  } else {
    next();
  }
};

module.exports.onlyForCustomer = (req, res, next) => {
  if (req.tokenData.role === CONSTANTS.CREATOR) {
    return next(new RightsError('this page only for customers'));
  } else {
    next();
  }
};

module.exports.canSendOffer = async (req, res, next) => {
  const {
    // params: { contestId },
    tokenData: { role },
    //TODO переробити щоб воно не отримувало contestId з body
    body: { contestId },
  } = req;
  if (role === CONSTANTS.CUSTOMER) {
    return next(new RightsError());
  }
  try {
    const result = await bd.Contest.findOne({
      where: {
        id: contestId,
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
    const result = await bd.Contest.findOne({
      where: {
        userId: req.tokenData.userId,
        id: req.body.contestId,
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

module.exports.canUpdateContest = async (req, res, next) => {
  try {
    const result = bd.Contest.findOne({
      where: {
        userId: req.tokenData.userId,
        id: req.body.contestId,
        status: { [bd.Sequelize.Op.not]: CONSTANTS.CONTEST_STATUS_FINISHED },
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
