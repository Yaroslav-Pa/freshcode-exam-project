
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('contests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      contestType: {
        field: 'contest_type',
        allowNull: false,
        type: Sequelize.ENUM('name', 'tagline', 'logo'),
      },
      fileName: {
        field: 'file_name',
        allowNull: true,
        type: Sequelize.STRING,
      },
      originalFileName: {
        field: 'original_file_name',
        allowNull: true,
        type: Sequelize.STRING,
      },
      title: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      typeOfName: {
        field: 'type_of_name',
        allowNull: true,
        type: Sequelize.STRING,
      },
      industry: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      focusOfWork: {
        field: 'focus_of_work',
        allowNull: true,
        type: Sequelize.TEXT,
      },
      targetCustomer: {
        field: 'target_customer',
        allowNull: true,
        type: Sequelize.TEXT,
      },
      styleName: {
        field: 'style_name',
        allowNull: true,
        type: Sequelize.STRING,
      },
      nameVenture: {
        field: 'name_venture',
        allowNull: true,
        type: Sequelize.STRING,
      },
      typeOfTagline: {
        field: 'type_of_tagline',
        allowNull: true,
        type: Sequelize.STRING,
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      brandStyle: {
        field: 'brand_style',
        allowNull: true,
        type: Sequelize.STRING,
      },
      prize: {
        allowNull: false,
        type: Sequelize.DECIMAL,
      },
      createdAt: {
        field: 'created_at',
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      priority: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      orderId: {
        field: 'order_id',
        allowNull: false,
        type: Sequelize.STRING,
      },
      userId: {
        field: 'user_id',
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('contests');
  },
};
