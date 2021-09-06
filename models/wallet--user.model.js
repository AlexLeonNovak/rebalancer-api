'use strict';
const { Model } = require('sequelize');

const {User, Wallet} = require('./user.model');

module.exports = (sequelize, DataTypes) => {
  class WalletUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  WalletUser.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    walletId: {
      type: DataTypes.INTEGER,
      references: {
        model: Wallet,
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'WalletUser',
    tableName: 'wallets__users'
  });
  return WalletUser;
};
