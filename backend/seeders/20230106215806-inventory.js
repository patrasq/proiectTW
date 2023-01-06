'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('inventories', [
      { user_id: 1, name: 'Napolact Milk', qty: 1, category_id: 1, expiresAt: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { user_id: 1, name: 'Snickers', qty: 5, category_id: 3, expiresAt: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { user_id: 1, name: 'Coca Cola', qty: 2, category_id: 2, expiresAt: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, name: 'Pepsi', qty: 1, category_id: 1, expiresAt: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, name: 'Milk', qty: 5, category_id: 3, expiresAt: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, name: 'Shrimp', qty: 12, category_id: 3, expiresAt: new Date(), createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('inventories', null, {});
  }
};
