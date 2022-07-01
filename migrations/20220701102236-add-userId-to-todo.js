'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.addColumn('Todos', 'UserId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'Users', key: 'id' }
    })
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.removeColumn('Todos', 'UserId')
  }
};
