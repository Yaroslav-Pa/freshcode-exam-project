'use strict';
const bcrypt = require('bcrypt');
const {
  SALT_ROUNDS,
  CUSTOMER,
  CREATOR,
  START_USERS,
  MODERATOR,
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
        email: START_USERS[0].EMAIL,
        password: bcrypt.hashSync(START_USERS[0].EMAIL, SALT_ROUNDS),
        role: CUSTOMER,
      },
      {
        id: START_USERS[1].ID,
        first_name: 'create',
        last_name: 'create',
        display_name: 'create',
        email: START_USERS[1].EMAIL,
        password: bcrypt.hashSync(START_USERS[1].EMAIL, SALT_ROUNDS),
        role: CREATOR,
      },
      {
        id: START_USERS[2].ID,
        first_name: 'moderator',
        last_name: 'moderator',
        display_name: 'moderator',
        email: START_USERS[2].EMAIL,
        password: bcrypt.hashSync(START_USERS[2].EMAIL, SALT_ROUNDS),
        role: MODERATOR,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', {
      email: {
        [Sequelize.Op.in]: [
          START_USERS[0].EMAIL,
          START_USERS[1].EMAIL,
          START_USERS[2].EMAIL,
        ],
      },
    });
  },
};
