const db = require('../db/models');
const ServerError = require('../errors/ServerError');
const UserNotFoundError = require('../errors/UserNotFoundError');

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
