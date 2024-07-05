const CONSTANTS = require('../../constants');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        firstName: {
          field: 'first_name',
          type: Sequelize.STRING,
          allowNull: false,
        },
        lastName: {
          field: 'last_name',
          type: Sequelize.STRING,
          allowNull: false,
        },
        displayName: {
          field: 'display_name',
          type: Sequelize.STRING,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        avatar: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'anon.png',
        },
        role: {
          type: Sequelize.ENUM(
            CONSTANTS.CUSTOMER,
            CONSTANTS.CREATOR,
            CONSTANTS.MODERATOR
          ),
          allowNull: false,
        },
        balance: {
          type: Sequelize.DECIMAL,
          allowNull: false,
          defaultValue: 0,
        },
        accessToken: {
          field: 'access_token',
          type: Sequelize.TEXT,
          allowNull: true,
        },
        rating: {
          type: Sequelize.FLOAT,
          allowNull: false,
          defaultValue: 0,
        },
      })
      .then(() =>
        queryInterface.addConstraint('users', {
          type: 'check',
          fields: ['balance'],
          where: {
            balance: {
              [Sequelize.Op.gte]: 0,
            },
          },
        })
      );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  },
};
