'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'examples@example.com',
      password: '123456',
      firstName: 'John',
      lastName: 'Doe',
      address: 'USA',
      gender: 1,
      phone: '0909',
      type: 'ROLE',
      keyRole: 'R1',
      
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
