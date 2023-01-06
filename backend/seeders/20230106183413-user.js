'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    // password is 'password' hashed with md5
    return queryInterface.bulkInsert('users', [
      { name: 'John', password: '5f4dcc3b5aa765d61d8327deb882cf99', email: 'john@foowa.com', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Jane', password: '5f4dcc3b5aa765d61d8327deb882cf99', email: 'jane@foowa.com', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Joe', password: '5f4dcc3b5aa765d61d8327deb882cf99', email: 'joe@foowa.com', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Jill', password: '5f4dcc3b5aa765d61d8327deb882cf99', email: 'jill@foowa.com', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};