'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    static STATUS_ACTIVE = 'active';
    static STATUS_DELETED = 'deleted';

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Wallet.init({
    name: DataTypes.STRING,
    config: DataTypes.JSON,
    status: DataTypes.ENUM('active', 'deleted')
  }, {
    sequelize,
    modelName: 'Wallet',
  });
  return Wallet;
};
