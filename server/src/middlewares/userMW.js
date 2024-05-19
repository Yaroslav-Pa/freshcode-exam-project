const CONSTANTS = require('../constants');
const db = require('../db/models');
const jwt = require('jsonwebtoken');
const ServerError = require('../errors/ServerError');
const TokenError = require('../errors/TokenError');
const UserNotFoundError = require('../errors/UserNotFoundError');
const RightsError = require('../errors/RightsError');

module.exports.findUserById = async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;

    const user = await db.User.findByPk(userId);
    if (!user) {
      return next(new UserNotFoundError('User by this id does not exist'));
    }

    req.user = user;
    next();
  } catch (error) {
    next(new ServerError(error.message));
  }
};

//TODO! не впевнений чи потрібно воно
module.exports.getUserIdFromToken = async (req, res, next) => {
  try {
    const {
      headers: { authorization },
    } = req;

    if (!authorization) {
      return next(new TokenError('No token'));
    }
    const tokenData = jwt.verify(authorization, CONSTANTS.JWT_SECRET);

    req.tokenUserId = tokenData.userId;
    next();
  } catch (error) {
    next(new ServerError(error.message));
  }
};

module.exports.isSamePerson = async (req, res, next) => {
  try {
    const {
      tokenUserId,
      user
    } = req;

    if (user?.id !== tokenUserId) {
      //TODO можливо іншу помилку?
      return next(
        new RightsError("Cannot get another person's information")
      );
    }
    next();
  } catch (error) {
    next(new ServerError(error.message));
  }
};
