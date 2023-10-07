'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addIndex('BookBorrowers',['returnedAt'], { transaction });
      await queryInterface.addIndex('BookBorrowers',['from'], { transaction });
      await queryInterface.addIndex('BookBorrowers',['to'], { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeIndex('BookBorrowers', ['returnedAt'], { transaction });
      await queryInterface.removeIndex('BookBorrowers', ['from'], { transaction });
      await queryInterface.removeIndex('BookBorrowers', ['to'], { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
