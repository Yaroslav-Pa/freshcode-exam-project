'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Conversation, Catalog }) {
      Chat.belongsTo(Conversation, {
        foreignKey: 'conversationId',
        sourceKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      Chat.belongsTo(Catalog, {
        foreignKey: 'catalogId',
        sourceKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Chat.init(
    {
      catalogId: {
        field: 'catalog_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'catalogs',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        primaryKey: true,
      },
      conversationId: {
        field: 'conversation_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'conversations',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        primaryKey: true,
      },
    },
    {
      sequelize,
      tableName: 'chats',
      modelName: 'Chat',
      timestamps: false,
    }
  );
  return Chat;
};
