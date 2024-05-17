module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          first_name: '1',
          last_name: '1',
          display_name: '1',
          password: '111111',
          email: '1@gmail.com',
          role: 'customer',
        },
      ],
      {}
    );
  },
};
