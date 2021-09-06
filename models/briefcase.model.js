'use strict';
const { Model } = require('sequelize');
const {Wallet} = require('./user.model');
module.exports = (sequelize, DataTypes) => {
  class Briefcase extends Model {
    static THRESHOLD_TYPE_NUMERIC = 'numeric';
    static THRESHOLD_TYPE_PERCENTAGE = 'percentage';

    static STATUS_NEW = 'new';
    static STATUS_ACTIVE = 'active';
    static STATUS_IN_REBALANCE = 'in-rebalance';
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
  Briefcase.init({
    walletId: {
      type: DataTypes.INTEGER,
      references: {
        model: Wallet,
        key: 'id'
      }
    },
    name: DataTypes.STRING,
    initialValuation: DataTypes.FLOAT,
    currentValuation: DataTypes.FLOAT,
    thresholdType: DataTypes.ENUM(
      this.THRESHOLD_TYPE_NUMERIC,
      this.THRESHOLD_TYPE_PERCENTAGE
    ),
    thresholdValue: DataTypes.FLOAT,
    status: DataTypes.ENUM(
      this.STATUS_NEW,
      this.STATUS_ACTIVE,
      this.STATUS_IN_REBALANCE,
      this.STATUS_DELETED
    )
  }, {
    sequelize,
    modelName: 'Briefcase',
    tableName: 'briefcases'
  });
  return Briefcase;
};
