'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Offer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Contest, Rating }) {
      // define association here
      Offer.belongsTo(User, {
        foreignKey: 'userId',
        sourceKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      Offer.belongsTo(Contest, {
        foreignKey: 'contestId',
        sourceKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      Offer.hasOne(Rating, {
        foreignKey: 'offerId',
        targetKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Offer.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        field:"user_id",
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      contestId: {
        field:"contest_id",
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fileName: {
        field:"file_name",
        type: DataTypes.STRING,
        allowNull: true,
      },
      originalFileName: {
        field:"original_file_name",
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'pending',
      },
    },
    {
      sequelize,
      underscored: true,
      tableName: 'offers',
      modelName: 'Offer',
      timestamps: false,
    }
  );
  return Offer;
};
