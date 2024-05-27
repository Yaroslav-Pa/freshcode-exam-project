'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Offer }) {
      // define association here
      Contest.belongsTo(User, { foreignKey: 'userId', sourceKey: 'id' });

      Contest.hasMany(Offer, { foreignKey: 'contestId', targetKey: 'id' });
    }
  }
  Contest.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      orderId: {
        field: 'order_id',
        allowNull: false,
        type: DataTypes.STRING,
      },
      userId: {
        field: 'user_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      contestType: {
        field: 'contest_type',
        allowNull: false,
        type: DataTypes.ENUM('name', 'tagline', 'logo'),
      },
      fileName: {
        field: 'file_name',
        allowNull: true,
        type: DataTypes.STRING,
      },
      originalFileName: {
        field: 'original_file_name',
        allowNull: true,
        type: DataTypes.STRING,
      },
      title: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      typeOfName: {
        field: 'type_of_name',
        allowNull: true,
        type: DataTypes.STRING,
      },
      industry: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      focusOfWork: {
        field: 'focus_of_work',
        allowNull: true,
        type: DataTypes.TEXT,
      },
      targetCustomer: {
        field: 'target_customer',
        allowNull: true,
        type: DataTypes.TEXT,
      },
      styleName: {
        field: 'style_name',
        allowNull: true,
        type: DataTypes.STRING,
      },
      nameVenture: {
        field: 'name_venture',
        allowNull: true,
        type: DataTypes.STRING,
      },
      typeOfTagline: {
        field: 'type_of_tagline',
        allowNull: true,
        type: DataTypes.STRING,
      },
      brandStyle: {
        field: 'brand_style',
        allowNull: true,
        type: DataTypes.STRING,
      },
      createdAt: {
        field: 'created_at',
        allowNull: true,
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      prize: {
        allowNull: false,
        type: DataTypes.DECIMAL,
      },
      priority: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      tableName: 'contests',
      modelName: 'Contest',
      timestamps: false,
      underscored: true,
    }
  );
  return Contest;
};
