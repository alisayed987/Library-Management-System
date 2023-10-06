const express = require('express');
const authors = require('./authors');
const books = require('./books');
const borrowers = require('./borrowers');
const processes = require('./processes');

module.exports = function (app, sequelize) {
    app.use(express.json());
    app.use(
        express.urlencoded({
            extended: true,
        })
    );
    
    app.use('/api/authors', authors(sequelize));
    app.use('/api/books', books(sequelize));
    app.use('/api/borrowers', borrowers(sequelize));
    app.use('/api/processes', processes(sequelize));
}