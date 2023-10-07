'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Borrower extends Model {
    static associate(models) {
      this.belongsToMany(models.Book, { through: models.BookBorrower })
    }
  }
  Borrower.init({
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true
      },
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Borrower',
  });
  return Borrower;
};