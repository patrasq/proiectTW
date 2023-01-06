'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('alerts', [
      { user_id: 1, title: 'Alert 1', contents: 'Alert 1 contents', createdAt: new Date(), updatedAt: new Date(), inventory_id: 1 },
      { user_id: 1, title: 'Alert 2', contents: 'Alert 2 contents', createdAt: new Date(), updatedAt: new Date(), inventory_id: 2 },
      { user_id: 1, title: 'Alert 3', contents: 'Alert 3 contents', createdAt: new Date(), updatedAt: new Date(), inventory_id: 3 },
      { user_id: 2, title: 'Alert 4', contents: 'Alert 4 contents', createdAt: new Date(), updatedAt: new Date(), inventory_id: 4 },
      { user_id: 2, title: 'Alert 5', contents: 'Alert 5 contents', createdAt: new Date(), updatedAt: new Date(), inventory_id: 5 },
      { user_id: 2, title: 'Alert 6', contents: 'Alert 6 contents', createdAt: new Date(), updatedAt: new Date(), inventory_id: 6 },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('alerts', null, {});
  }
};
