'use strict';
const { Model } = require('sequelize');
const {User} = require('./user.model');

module.exports = (sequelize, DataTypes) => {
  class UsersToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UsersToken.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    deviceId: DataTypes.STRING,
    refreshToken: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UsersToken',
    tableName: 'users_tokens',
  });
  return UsersToken;
};
