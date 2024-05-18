const {
  getUserTransactionHistory,
  getUserTransactionSummary,
} = require('../controllers/transactionHistoryController');
const { findUserById } = require('../middlewares/userMW');
const transactionHistoryRouter = require('express').Router();

transactionHistoryRouter
  .route('/:userId')
  .get(findUserById, getUserTransactionHistory);

transactionHistoryRouter
  .route('/:userId/summary')
  .get(findUserById, getUserTransactionSummary);

module.exports = transactionHistoryRouter;
