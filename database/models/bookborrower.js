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
    returnedAt: {
      allowNull: true,
      type: DataTypes.DATE
    },
  }, {
    sequelize,
    modelName: 'BookBorrower',
  });
  return BookBorrower;
};