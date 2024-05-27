const CONSTANTS = require('../../constants');
const bcrypt = require('bcrypt');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          first_name: 'buy',
          last_name: 'buy',
          display_name: 'buy',
          email: 'buy@gmail.com',
          password: await bcrypt.hash("buy@gmail.com", CONSTANTS.SALT_ROUNDS),
          role: 'customer',
        },
        {
          first_name: 'create',
          last_name: 'create',
          display_name: 'create',
          email: 'create@gmail.com',
          password: await bcrypt.hash("create@gmail.com", CONSTANTS.SALT_ROUNDS),
          role: 'creator',
        },
      ],
      {}
    );
  },
};
