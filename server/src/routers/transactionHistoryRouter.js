const {
  getUserTransactionHistory,
  getUserTransactionSummary,
} = require('../controllers/transactionHistoryController');
const transactionHistoryRouter = require('express').Router();

transactionHistoryRouter.get('/', getUserTransactionHistory);

transactionHistoryRouter.get('/summary', getUserTransactionSummary);

module.exports = transactionHistoryRouter;
