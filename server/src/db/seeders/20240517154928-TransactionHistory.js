const {
  START_USERS,
  TRANSACTION_INCOME,
  TRANSACTION_CONSUMPTION
} = require('../../constants');

const date = "20210801";

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'transaction_histories',
      [
        {
          user_id: START_USERS[0].ID,
          operation_type: TRANSACTION_INCOME,
          sum: 1000,
          created_at: date,
          updated_at: date,
        },
        {
          user_id: START_USERS[0].ID,
          operation_type: TRANSACTION_CONSUMPTION,
          sum: 200,
          created_at: date,
          updated_at: date,
        },
      ],
      {}
    );
  },
  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('transaction_histories', {
      user_id: START_USERS[0].ID,
      created_at: date,
    });
  },
};
