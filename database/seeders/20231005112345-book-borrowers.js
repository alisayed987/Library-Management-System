'use strict';
const moment = require('moment');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('bookborrowers', [{
      bookId: 1,
      borrowerId: 1,
      from: new Date("2023-10-01 15:00:00"),
      to: new Date("2023-10-04 15:00:00"),
      returnedAt: new Date("2023-10-04 12:00:00"),
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    {
      bookId: 2,
      borrowerId: 1,
      from: new Date("2023-10-05 15:00:00"),
      to: new Date("2023-10-08 15:00:00"),
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    {
      bookId: 1,
      borrowerId: 2,
      from: new Date("2023-10-05 15:00:00"),
      to: new Date("2023-10-08 15:00:00"),
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    {
      bookId: 2,
      borrowerId: 2,
      from: new Date("2023-10-05 15:00:00"),
      to: new Date("2023-10-08 15:00:00"),
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    {
      bookId: 2,
      borrowerId: 3,
      from: new Date("2023-09-25 15:00:00"),
      to: new Date("2023-09-28 15:00:00"),
      returnedAt: new Date("2023-09-27 14:00:00"),
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    {
      bookId: 2,
      borrowerId: 3,
      from: new Date("2023-10-05 15:00:00"),
      to: new Date("2023-10-10 15:00:00"),
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    {
      bookId: 1,
      borrowerId: 4,
      from: new Date("2023-09-23 15:00:00"),
      to: new Date("2023-09-29 15:00:00"),
      returnedAt: new Date("2023-09-27 14:00:00"),
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    {
      bookId: 2,
      borrowerId: 4,
      from: new Date("2023-10-02 15:00:00"),
      to: new Date("2023-10-08 15:00:00"),
      returnedAt: new Date("2023-09-05 14:00:00"),
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    {
      bookId: 3,
      borrowerId: 4,
      from: new Date("2023-10-05 15:00:00"),
      to: new Date("2023-10-15 15:00:00"),
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    {
      bookId: 4,
      borrowerId: 4,
      from: new Date("2023-10-05 15:00:00"),
      to: new Date("2023-10-10 15:00:00"),
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    {
      bookId: 4,
      borrowerId: 1,
      from: new Date("2023-10-01 15:00:00"),
      to: new Date("2023-10-03 15:00:00"),
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bookborrowers', null, {});
  }
};
