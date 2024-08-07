const db = require('../db/models');
const ServerError = require('../errors/ServerError');

module.exports.getUserTransactionHistory = async (req, res, next) => {
  try {
    const {
      tokenData: { userId },
    } = req;
    
    const fullHistory = await db.TransactionHistory.findAll({
      where: { userId },
      attributes: {
        exclude: ['userId', 'updatedAt'],
      },
    });

    res.send(fullHistory);
  } catch (error) {
    next(new ServerError('Cannot get transaction history'));
  }
};

module.exports.getUserTransactionSummary = async (req, res, next) => {
  try {
    const { user } = req;

    const transactions = await user.getTransactionHistories({
      attributes: [
        'operation_type',
        [db.Sequelize.fn('SUM', db.Sequelize.col('sum')), 'total'],
      ],
      group: ['operation_type'],
      raw: true,
    });

    const summary = Object.fromEntries(
      transactions.map((transaction) => [
        transaction.operation_type,
        +transaction.total,
      ])
    );
    res.send(summary);
  } catch (error) {
    next(new ServerError('Cannot get transaction history'));
  }
};
