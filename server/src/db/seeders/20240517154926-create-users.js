'use strict';
const bcrypt = require('bcrypt');
const {
  SALT_ROUNDS,
  CUSTOMER,
  CREATOR,
  START_USERS,
} = require('../../constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        id: START_USERS[0].ID,
        first_name: 'buy',
        last_name: 'buy',
        display_name: 'buy',
        email: START_USERS[0].NAME,
        password: bcrypt.hashSync(START_USERS[0].NAME, SALT_ROUNDS),
        role: CUSTOMER,
      },
      {
        id: START_USERS[1].ID,
        first_name: 'create',
        last_name: 'create',
        display_name: 'create',
        email: START_USERS[1].NAME,
        password: bcrypt.hashSync(START_USERS[1].NAME, SALT_ROUNDS),
        role: CREATOR,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', {
      email: {
        [Sequelize.Op.in]: ['create@gmail.com', 'buy@gmail.com'],
      },
    });
  },
};
