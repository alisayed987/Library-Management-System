'use strict';
const moment = require('moment');
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10);
    await queryInterface.bulkInsert('borrowers', [{
      name: "borrower1",
      email: "borrower1@gmail.com",
      password: await bcrypt.hash("password", salt),
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    {
      name: "borrower2",
      email: "borrower2@gmail.com",
      password: await bcrypt.hash("password", salt),
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    {
      name: "borrower3",
      email: "borrower3@gmail.com",
      password: await bcrypt.hash("password", salt),
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    {
      name: "borrower4",
      email: "borrower4@gmail.com",
      password: await bcrypt.hash("password", salt),
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    {
      name: "borrower5",
      email: "borrower5@gmail.com",
      password: await bcrypt.hash("password", salt),
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    {
      name: "borrower6",
      email: "borrower6@gmail.com",
      password: await bcrypt.hash("password", salt),
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('borrowers', null, {});
  }
};
