'use strict';

const bcrypt = require('bcryptjs')
const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}

module.exports = {
  async up(queryInterface, Sequelize) {
    // create user
    const newUser = await queryInterface.bulkInsert('Users', [{
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: bcrypt.hashSync(SEED_USER.password, bcrypt.genSaltSync(10), null),
      createdAt: new Date(),
      updatedAt: new Date()
    }])

    // create todo with UserId
    return queryInterface.bulkInsert('Todos',
      Array.from({ length: 10 }).map((_, i) => ({
        name: `name-${i + 1}`,
        UserId: newUser,
        createdAt: new Date(),
        updatedAt: new Date()
      })))
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Todos', null)
    return queryInterface.bulkDelete('Users', null)
  }
};
