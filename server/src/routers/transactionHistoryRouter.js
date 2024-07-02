const {
  getUserTransactionHistory,
  getUserTransactionSummary,
} = require('../controllers/transactionHistoryController');

const transactionHistoryRouter = require('express').Router();

// /user/transactionHistory
transactionHistoryRouter.get('/', getUserTransactionHistory);

// /user/transactionHistory/summary
transactionHistoryRouter.get('/summary', getUserTransactionSummary);

module.exports = transactionHistoryRouter;
