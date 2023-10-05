const express = require('express');
const router = express.Router();

const { Op } = require("sequelize");

module.exports = (sequelize) => {
  const Book = sequelize.models.Book;

  router.get('/', async (req, res) => {
    let filters = req.query;
    let authorName = {};
    let booksQueryConditions = {};
    /**
     * Available books filter keys
     */
    if (filters) {
      if (filters['isbn']) booksQueryConditions.isbn10 = filters['isbn'];
      // NOTE:: titleLike must be before title because if we recieve both title should override titleLike
      if (filters['titleLike']) booksQueryConditions.title = {[Op.substring]: filters['titleLike']};
      if (filters['title']) booksQueryConditions.title = filters['title'];

      // NOTE:: authorLike must be author title because if we recieve both author should override authorLike
      if (filters['authorLike']) authorName.name = {[Op.substring]: filters['authorLike']};
      if (filters['author']) authorName.name = filters['author'];
    }

    const books = await Book.findAll({
      where: booksQueryConditions,
      include: [
        {
          model: sequelize.models.Author,
          where: authorName
        }
      ]
    });

    res.send(books);
  });

  router.get('/:id', async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    res.send(book);
  });

  router.post('/', async (req, res) => {
    try {
      const book = await Book.create(req.body)
      book.save();
      res.status(201).send(book);
    } catch (error) {
      res.status(400).send(error.message)
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const updated = await Book.update(
        req.body,
        {
          where: {
            id: req.params.id
          }
        });
      res.status(202).send(updated);
    } catch (error) {
      res.status(400).send(error.message)
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const deleted = await Book.destroy({
        where: {
          id: req.params.id
        }
      });

      if (!deleted) {
        res.status(404).send("No matching id to delete");
        return;
      }

      res.status(200).send("Deleted");
    } catch (error) {
      res.status(400).send(error.message)
    }
  });

  return router;
}