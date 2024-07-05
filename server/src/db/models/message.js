'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Conversation }) {
      Message.belongsTo(User, {
        foreignKey: 'sender',
        sourceKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      Message.belongsTo(Conversation, {
        foreignKey: 'conversation',
        sourceKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Message.init(
    {
      sender: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      body: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      conversation: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'conversations',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    },
    {
      sequelize,
      tableName: 'messages',
      modelName: 'Message',
      timestamps: true,
    }
  );
  return Message;
};
