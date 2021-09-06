'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('briefcase_symbols', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      briefcaseId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'briefcases',
          },
          key: 'id'
        }
      },
      name: {
        type: Sequelize.STRING
      },
      initialPart: {
        type: Sequelize.FLOAT
      },
      actualPart: {
        type: Sequelize.FLOAT
      },
      lastTransactionCoinPrice: {
        type: Sequelize.FLOAT
      },
      currentCoinPrice: {
        type: Sequelize.FLOAT
      },
      currentCoinQuantity: {
        type: Sequelize.FLOAT
      },
      currentValuation: {
        type: Sequelize.FLOAT
      },
      thresholdType: {
        type: Sequelize.ENUM('numeric', 'percentage')
      },
      thresholdValue: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('briefcase_symbols');
  }
};
