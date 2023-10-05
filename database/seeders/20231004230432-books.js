'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('books', [{
      title: "Ali's book 1",
      authorId: 1,
      isbn10: '0596520689',
      availableQuantity: 1,
      shelfLocation: 'ab-cd, ef1',
      createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
    },
    {
      title: "Ali's book 2",
      authorId: 1,
      isbn10: '0592260127',
      availableQuantity: 0,
      shelfLocation: 'ab-cd, ef2',
      createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
    },
    {
      title: "Sayed's book 1",
      authorId: 2,
      isbn10: '0592260232',
      availableQuantity: 0,
      shelfLocation: 'ab-cd, ef3',
      createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
    },
    {
      title: "Sayed's book 2",
      authorId: 2,
      isbn10: '0592260240',
      availableQuantity: 5,
      shelfLocation: 'ab-cd, ef3',
      createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('books', null, {});
  }
};
