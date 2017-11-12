'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.createTable('users', {
          id: Sequelize.INTEGER,
          username: Sequelize.STRING,
          age: Sequelize.INTEGER,
          email: Sequelize.STRING,
          createdAt: {
              allowNull: false,
              type: Sequelize.DATE
          },
          updatedAt: {
              allowNull: false,
              type: Sequelize.DATE
          },
          deletedAt: {
              type: Sequelize.DATE
          }
      });
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.dropTable('users');
  }
};
