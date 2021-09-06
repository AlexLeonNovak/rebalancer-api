'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('briefcases', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      walletId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'wallets',
          },
          key: 'id'
        }
      },
      name: {
        type: Sequelize.STRING
      },
      initialValuation: {
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
      status: {
        type: Sequelize.ENUM('new', 'active', 'in-rebalance', 'deleted')
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
    await queryInterface.dropTable('briefcases');
  }
};
