const express = require('express');
const router = express.Router();

module.exports = (sequelize) => {
  const Book = sequelize.models.Book;

  router.get('/', async (req, res) => {
    const books = await Book.findAll();
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