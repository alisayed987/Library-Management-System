'use strict';
const moment = require('moment');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('books', [{
      title: "Ali's book 1",
      authorId: 1,
      isbn10: '0596520689',
      availableQuantity: 1,
      shelfLocation: 'ab-cd, ef1',
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: "Ali's book 2",
      authorId: 1,
      isbn10: '0592260127',
      availableQuantity: 0,
      shelfLocation: 'ab-cd, ef2',
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: "Sayed's book 1",
      authorId: 2,
      isbn10: '0592260232',
      availableQuantity: 0,
      shelfLocation: 'ab-cd, ef3',
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: "Sayed's book 2",
      authorId: 2,
      isbn10: '0592260240',
      availableQuantity: 5,
      shelfLocation: 'ab-cd, ef3',
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('books', null, {});
  }
};
