'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static STATUS_NEW = 'new';
    static STATUS_WAIT = 'wait';
    static STATUS_ACTIVE = 'active';
    static STATUS_INACTIVE = 'inactive';
    static STATUS_BLOCKED = 'blocked';
    static STATUS_DELETED = 'deleted';
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    passwordHash: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
    tableName: 'users',
    underscored: true
  });
  return Users;
};
