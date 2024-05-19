const {
  getUserTransactionHistory,
  getUserTransactionSummary,
} = require('../controllers/transactionHistoryController');
const transactionHistoryRouter = require('express').Router();

transactionHistoryRouter.get('/', getUserTransactionHistory);

//TODO! не впевнений навіщо цей запит, бо на front'е воно не буде використовуватись, але у завданні воно є тож потрібно
//? якщо потрібно - у query можна засовувати дату, але тоді потрібно трішки доробити запит
transactionHistoryRouter.get('/summary', getUserTransactionSummary);

module.exports = transactionHistoryRouter;
