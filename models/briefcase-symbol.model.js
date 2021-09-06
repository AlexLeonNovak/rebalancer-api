'use strict';
const {
  Model
} = require('sequelize');
const {Briefcase} = require('./user.model');
module.exports = (sequelize, DataTypes) => {
  class BriefcaseSymbol extends Model {
    static THRESHOLD_TYPE_NUMERIC = 'numeric';
    static THRESHOLD_TYPE_PERCENTAGE = 'percentage';

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  BriefcaseSymbol.init({
    briefcaseId: {
      type: DataTypes.INTEGER,
      references: {
        model: Briefcase,
        key: 'id'
      }
    },
    name: DataTypes.STRING,
    initialPart: DataTypes.FLOAT,
    actualPart: DataTypes.FLOAT,
    lastTransactionCoinPrice: DataTypes.FLOAT,
    currentCoinPrice: DataTypes.FLOAT,
    currentCoinQuantity: DataTypes.FLOAT,
    currentValuation: DataTypes.FLOAT,
    thresholdType: DataTypes.ENUM('numeric', 'percentage'),
    thresholdValue: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'BriefcaseSymbol',
    tableName: 'briefcase_symbols'
  });
  return BriefcaseSymbol;
};
