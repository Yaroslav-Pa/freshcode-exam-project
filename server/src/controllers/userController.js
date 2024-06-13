const jwt = require('jsonwebtoken');
const CONSTANTS = require('../constants');
const db = require('../db/models');
const NotUniqueEmail = require('../errors/NotUniqueEmail');
const NotFound = require('../errors/UserNotFoundError');
const { v4: uuid } = require('uuid');
const controller = require('../socketInit');
const userQueries = require('./queries/userQueries');
const bankQueries = require('./queries/bankQueries');
const ratingQueries = require('./queries/ratingQueries');
const { createTransact } = require('./queries/transactQueries');

module.exports.login = async (req, res, next) => {
  try {
    const foundUser = await userQueries.findUser({ email: req.body.email });

    const isValidPassword = await foundUser.passwordCompare(req.body.password);

    if (!isValidPassword) {
      throw new NotFound('user with this data dont exist');
    }

    const accessToken = jwt.sign(
      {
        firstName: foundUser.firstName,
        userId: foundUser.id,
        role: foundUser.role,
        lastName: foundUser.lastName,
        avatar: foundUser.avatar,
        displayName: foundUser.displayName,
        balance: foundUser.balance,
        email: foundUser.email,
        rating: foundUser.rating,
      },
      CONSTANTS.JWT_SECRET,
      { expiresIn: CONSTANTS.ACCESS_TOKEN_TIME }
    );
    await userQueries.updateUser({ accessToken }, foundUser.id);
    res.send({ token: accessToken });
  } catch (err) {
    next(err);
  }
};
module.exports.registration = async (req, res, next) => {
  try {
    const newUser = await userQueries.userCreation(req.body);
    const accessToken = jwt.sign(
      {
        firstName: newUser.firstName,
        userId: newUser.id,
        role: newUser.role,
        lastName: newUser.lastName,
        avatar: newUser.avatar,
        displayName: newUser.displayName,
        balance: newUser.balance,
        email: newUser.email,
        rating: newUser.rating,
      },
      CONSTANTS.JWT_SECRET,
      { expiresIn: CONSTANTS.ACCESS_TOKEN_TIME }
    );
    await userQueries.updateUser({ accessToken }, newUser.id);
    res.send({ token: accessToken });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      next(new NotUniqueEmail());
    } else {
      next(err);
    }
  }
};

function getQuery(offerId, userId, mark, isFirst, transaction) {
  const getCreateQuery = () =>
    ratingQueries.createRating(
      {
        offerId,
        mark,
        userId,
      },
      transaction
    );
  const getUpdateQuery = () =>
    ratingQueries.updateRating({ mark }, { offerId, userId }, transaction);
  return isFirst ? getCreateQuery : getUpdateQuery;
}

module.exports.changeMark = async (req, res, next) => {
  let sum = 0;
  let avg = 0;
  let transaction;
  const {
    params: { creatorId, offerId },
    body: { isFirst, mark },
  } = req;
  const userId = req.tokenData.userId;
  try {
    transaction = await db.sequelize.transaction({
      isolationLevel:
        db.Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED,
    });
    const query = getQuery(offerId, userId, mark, isFirst, transaction);
    await query();
    const offersArray = await db.Rating.findAll({
      include: [
        {
          model: db.Offer,
          required: true,
          where: { userId: creatorId },
        },
      ],
      transaction,
    });
    for (let i = 0; i < offersArray.length; i++) {
      sum += offersArray[i].dataValues.mark;
    }
    avg = sum / offersArray.length;

    await userQueries.updateUser({ rating: avg }, creatorId, transaction);
    transaction.commit();
    controller.getNotificationController().emitChangeMark(+creatorId);
    res.send({ userId: creatorId, rating: avg });
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

module.exports.payment = async (req, res, next) => {
  let transaction;
  try {
    transaction = await db.sequelize.transaction();
    await bankQueries.updateBankBalance(
      {
        balance: db.sequelize.literal(`
                CASE
            WHEN "card_number"='${req.body.number.replace(
              / /g,
              ''
            )}' AND "cvc"='${req.body.cvc}' AND "expiry"='${req.body.expiry}'
                THEN "balance"-${req.body.price}
            WHEN "card_number"='${
              CONSTANTS.SQUADHELP_BANK_NUMBER
            }' AND "cvc"='${CONSTANTS.SQUADHELP_BANK_CVC}' AND "expiry"='${
          CONSTANTS.SQUADHELP_BANK_EXPIRY
        }'
                THEN "balance"+${req.body.price} END
        `),
      },
      {
        cardNumber: {
          [db.Sequelize.Op.in]: [
            CONSTANTS.SQUADHELP_BANK_NUMBER,
            req.body.number.replace(/ /g, ''),
          ],
        },
      },
      transaction
    );
    const orderId = uuid();
    req.body.contests.forEach((contest, index) => {
      const prize =
        index === req.body.contests.length - 1
          ? Math.ceil(req.body.price / req.body.contests.length)
          : Math.floor(req.body.price / req.body.contests.length);
      contest = Object.assign(contest, {
        status: index === 0 ? 'active' : 'pending',
        userId: req.tokenData.userId,
        priority: index + 1,
        orderId,
        createdAt: new Date(),
        prize,
      });
    });
    await db.Contest.bulkCreate(req.body.contests, transaction);
    transaction.commit();
    const transact = await createTransact(
      req.tokenData.userId,
      CONSTANTS.TRANSACTION_CONSUMPTION,
      req.body.price
    );

    res.send();
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const { file, body, tokenData } = req;
    
    if (file) {
      body.avatar = file.filename;
    }

    const accessToken = jwt.sign(
      {
        firstName: body.firstName,
        lastName: body.lastName,
        displayName: body.displayName,
        avatar: file ? body.avatar : tokenData.avatar,

        userId: tokenData.userId,
        role: tokenData.role,
        balance: tokenData.balance,
        email: tokenData.email,
        rating: tokenData.rating,
      },
      CONSTANTS.JWT_SECRET,
      { expiresIn: CONSTANTS.ACCESS_TOKEN_TIME }
    );

    const updatedUser = await userQueries.updateUser(
      { accessToken, ...body },
      req.tokenData.userId
    );

    res.send({
      token: accessToken,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      displayName: updatedUser.displayName,
      avatar: updatedUser.avatar,
      email: updatedUser.email,
      balance: updatedUser.balance,
      role: updatedUser.role,
      id: updatedUser.id,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.cashout = async (req, res, next) => {
  let transaction;
  try {
    transaction = await db.sequelize.transaction();
    const updatedUser = await userQueries.updateUser(
      { balance: db.sequelize.literal('balance - ' + req.body.sum) },
      req.tokenData.userId,
      transaction
    );
    await bankQueries.updateBankBalance(
      {
        balance: db.sequelize.literal(`CASE 
                WHEN "card_number"='${req.body.number.replace(
                  / /g,
                  ''
                )}' AND "expiry"='${req.body.expiry}' AND "cvc"='${
          req.body.cvc
        }'
                    THEN "balance"+${req.body.sum}
                WHEN "card_number"='${
                  CONSTANTS.SQUADHELP_BANK_NUMBER
                }' AND "expiry"='${
          CONSTANTS.SQUADHELP_BANK_EXPIRY
        }' AND "cvc"='${CONSTANTS.SQUADHELP_BANK_CVC}'
                    THEN "balance"-${req.body.sum}
                 END
                `),
      },
      {
        cardNumber: {
          [db.Sequelize.Op.in]: [
            CONSTANTS.SQUADHELP_BANK_NUMBER,
            req.body.number.replace(/ /g, ''),
          ],
        },
      },
      transaction
    );
    transaction.commit();

    const transact = await createTransact(
      req.tokenData.userId,
      CONSTANTS.TRANSACTION_CONSUMPTION,
      req.body.sum
    );

    res.send({ balance: updatedUser.balance, transact });
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};
