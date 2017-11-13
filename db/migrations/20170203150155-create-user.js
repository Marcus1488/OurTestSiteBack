'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.createTable('users', {
          id: {
              type: Sequelize.INTEGER,
              allowNull: false,
              primaryKey: true,
              autoIncrement: true
          },
          username: {
              type: Sequelize.STRING,
              allowNull: false
          },
          password: {
              type: Sequelize.STRING,
              allowNull: false
          }
      });
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.dropTable('users');
  }
};
