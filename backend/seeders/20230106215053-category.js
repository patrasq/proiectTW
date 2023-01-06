'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('categories', [
      { name: 'Fruits', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Vegetables', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Meat', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Dairy', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Bakery', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Canned Goods', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Frozen Foods', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Beverages', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Condiments', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Fish and seafood', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Snacks', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Other', createdAt: new Date(), updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
