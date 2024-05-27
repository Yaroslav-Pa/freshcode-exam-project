
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
        field:"user_id",
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      contestId: {
        field:"contest_id",
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'contests',
          key: 'id',
        },
      },
      text: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fileName: {
        field:"file_name",
        type: Sequelize.STRING,
        allowNull: true,
      },
      originalFileName: {
        field:"original_file_name",
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'pending',
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('offers');
  },
};
