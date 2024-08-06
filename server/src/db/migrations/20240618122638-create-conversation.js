'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('conversations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      participant1: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      participant2: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      blackList1: {
        type: Sequelize.BOOLEAN,
        field: 'black_list1',
        allowNull: false,
      },
      blackList2: {
        type: Sequelize.BOOLEAN,
        field: 'black_list2',
        allowNull: false,
      },
      favoriteList1: {
        type: Sequelize.BOOLEAN,
        field: 'favorite_list1',
        allowNull: false,
      },
      favoriteList2: {
        type: Sequelize.BOOLEAN,
        field: 'favorite_list2',
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('conversations');
  }
};