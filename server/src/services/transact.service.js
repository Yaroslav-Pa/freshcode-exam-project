const db = require('../db/models');

module.exports.createTransact = async (userId, operationType, sum) => {
  return await db.TransactionHistory.create({
    userId,
    operationType,
    sum,
  });
};
