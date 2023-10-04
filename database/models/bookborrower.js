'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookBorrower extends Model {
    static associate(models) {
      this.belongsTo(models.Book)
      this.belongsTo(models.Borrower)
    }
  }
  BookBorrower.init({
    bookId: {
      type: DataTypes.INTEGER,
      references: {
        model: "books",
        key: "id"
      }
    },
    borrowerId: {
      type: DataTypes.INTEGER,
      references: {
        model: "borrowers",
        key: "id"
      }
    },
    from: {
      type: DataTypes.DATE
    },
    to: {
      type: DataTypes.DATE
    },
    returned: {
      type: DataTypes.BOOLEAN
    },
  }, {
    sequelize,
    modelName: 'BookBorrower',
  });
  return BookBorrower;
};