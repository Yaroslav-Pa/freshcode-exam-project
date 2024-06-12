const {
  getUserTransactionHistory,
  getUserTransactionSummary,
} = require('../controllers/transactionHistoryController');

const transactionHistoryRouter = require('express').Router();

// /user/transactionHistory
transactionHistoryRouter.get('/', getUserTransactionHistory);

//TODO! на front'е воно не буде використовуватись, але у завданні воно є тож потрібно
// /user/transactionHistory/summary
transactionHistoryRouter.get('/summary', getUserTransactionSummary);

module.exports = transactionHistoryRouter;
