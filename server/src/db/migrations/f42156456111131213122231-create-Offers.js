const { OFFER_STATUS } = require("../../constants");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('offers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        field: 'user_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      contestId: {
        field: 'contest_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'contests',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      text: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fileName: {
        field: 'file_name',
        type: Sequelize.STRING,
        allowNull: true,
      },
      originalFileName: {
        field: 'original_file_name',
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM(
          OFFER_STATUS.FAIL_REVIEW,
          OFFER_STATUS.REVIEW,
          OFFER_STATUS.PENDING,
          OFFER_STATUS.REJECTED,
          OFFER_STATUS.RESOLVE
        ),
        allowNull: true,
        defaultValue: OFFER_STATUS.REVIEW,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('offers');
  },
};
