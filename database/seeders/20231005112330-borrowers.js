'use strict';
const moment = require('moment');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('borrowers', [{
      name: "borrower1",
      email: "borrower1@gmail.com",
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    {
      name: "borrower2",
      email: "borrower2@gmail.com",
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    {
      name: "borrower3",
      email: "borrower3@gmail.com",
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    {
      name: "borrower4",
      email: "borrower4@gmail.com",
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    {
      name: "borrower5",
      email: "borrower5@gmail.com",
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    {
      name: "borrower6",
      email: "borrower6@gmail.com",
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('borrowers', null, {});
  }
};
