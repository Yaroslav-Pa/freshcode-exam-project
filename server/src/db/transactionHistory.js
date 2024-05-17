'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {

    }
  }
  TransactionHistory.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      operationType: {
        allowNull: false,
        type: DataTypes.ENUM('INCOME', 'CONSUMPTION'),
      },
      sum: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      tableName: 'transaction_historys',
      modelName: 'TransactionHistory',
      timestamps: false,
    }
  );
  return TransactionHistory;
};
