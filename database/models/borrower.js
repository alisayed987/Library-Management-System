'use strict';
const {
  Model
} = require('sequelize');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  class Borrower extends Model {
    static associate(models) {
      this.belongsToMany(models.Book, { through: models.BookBorrower })
    }

    /**
     * Generate token for current user using id
     * @returns string
     */
    generateAuthToken() {
      try {
        const token = jwt.sign({ id: this.id }, process.env.SECRET);
        return token;
      } catch (error) {
        console.log(error);
        throw new Error('Error generating JWT: ', error.message);
      }
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