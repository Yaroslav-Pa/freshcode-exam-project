'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
const CONSTANTS = require('../constants');

async function hashPassword (user, options) {
  console.log(user.password);
  if(user.changed('password')) {
    const passwordHash = await bcrypt.hash(user.password, CONSTANTS.SALT_ROUNDS);
    user.password = passwordHash;
  }
}

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate( models ) {
      // define association here

      User.hasMany(models.Offer, {
        foreignKey: 'userId',
        targetKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      User.hasMany(models.Contest, {
        foreignKey: 'userId',
        targetKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      hashPassword
      User.hasMany(models.Rating, {
        foreignKey: 'userId',
        targetKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      User.hasMany(models.TransactionHistory, {
        foreignKey: 'userId',
        targetKey: 'id',
        as: 'transactionHistories',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }

    async passwordCompare (plaintextPassword) {
      return bcrypt.compare(plaintextPassword, this.getDataValue('password'));
    }
  }

  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      firstName: {
        field: 'first_name',
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        field: 'last_name',
        type: DataTypes.STRING,
        allowNull: false,
      },
      displayName: {
        field: 'display_name',
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'anon.png',
      },
      role: {
        type: DataTypes.ENUM('customer', 'creator'),
        allowNull: false,
      },
      balance: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      accessToken: {
        field: 'access_token',
        type: DataTypes.TEXT,
        allowNull: true,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      underscored: true,
      tableName: 'users',
      modelName: 'User',
      timestamps: false,
    }
  );
  
  User.beforeCreate(hashPassword);
  User.beforeUpdate(hashPassword);

  return User;
};
