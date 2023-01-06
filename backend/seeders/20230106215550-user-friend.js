'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     return queryInterface.bulkInsert('user_friends', [
      { user_id: 1, friend_id: 2, createdAt: new Date(), updatedAt: new Date() },
      { user_id: 1, friend_id: 3, createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, friend_id: 1, createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, friend_id: 4, createdAt: new Date(), updatedAt: new Date() },
      { user_id: 3, friend_id: 1, createdAt: new Date(), updatedAt: new Date() },
      { user_id: 3, friend_id: 4, createdAt: new Date(), updatedAt: new Date() },
     ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_friends', null, {});
  }
};
