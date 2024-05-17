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
      TransactionHistory.belongsTo(User, {
        foreignKey: 'userId',
        sourceKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  TransactionHistory.init(
    {
      userId: {
        field:"user_id",
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      operationType: {
        field:"operation_type",
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
      underscored: true,
      tableName: 'transaction_histories',
      modelName: 'TransactionHistory',
    }
  );
  return TransactionHistory;
};
