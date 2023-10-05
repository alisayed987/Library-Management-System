'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      this.belongsTo(models.Author)
      this.belongsToMany(models.Borrower, { through: models.BookBorrower })
    }
  }
  Book.init({
    title: {
      type: DataTypes.STRING
    },
    authorId: {
      type: DataTypes.INTEGER,
      references: {
        model: "authors",
        key: "id"
      }
    },
    isbn10: {
      type: DataTypes.STRING(10),
      unique: true,
      validate: {
        len: 10
      }
    },
    availableQuantity: {
      type: DataTypes.INTEGER
    },
    shelfLocation: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};