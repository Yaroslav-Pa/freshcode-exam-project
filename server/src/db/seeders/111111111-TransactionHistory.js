module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'transaction_histories',
      [
        {
          user_id: '1',
          operation_type: 'INCOME',
          sum: 1000,
          created_at: '20210801',
          updated_at: '20210801',
        },
        {
          user_id: '1',
          operation_type: 'CONSUMPTION',
          sum: 200,
          created_at: '20210801',
          updated_at: '20210801',
        },
      ],
      {}
    );
  },
};
