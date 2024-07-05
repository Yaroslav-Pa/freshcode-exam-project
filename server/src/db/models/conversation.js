'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Chat, Message }) {
      Conversation.belongsTo(User, {
        foreignKey: 'participant1',
        sourceKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      Conversation.belongsTo(User, {
        foreignKey: 'participant2',
        sourceKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      Conversation.hasMany(Chat, {
        foreignKey: 'conversationId',
        sourceKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      Conversation.hasMany(Message, {
        foreignKey: 'conversation',
        sourceKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
    }
  }

  Conversation.init(
    {
      participant1: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      participant2: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      blackList1: {
        type: DataTypes.BOOLEAN,
        field: 'black_list1',
        allowNull: false,
      },
      blackList2: {
        type: DataTypes.BOOLEAN,
        field: 'black_list2',
        allowNull: false,
      },
      favoriteList1: {
        type: DataTypes.BOOLEAN,
        field: 'favorite_list1',
        allowNull: false,
      },
      favoriteList2: {
        type: DataTypes.BOOLEAN,
        field: 'favorite_list2',
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'conversations',
      modelName: 'Conversation',
      timestamps: true,
    }
  );
  return Conversation;
};
