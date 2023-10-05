const express = require('express');
const router = express.Router();

module.exports = (sequelize) => {
  const Author = sequelize.models.Author;

  router.get('/', async (req, res) => {
    const authors = await Author.findAll();
    res.send(authors);
  });

  router.get('/:id', async (req, res) => {
    const author = await Author.findByPk(req.params.id);
    res.send(author);
  });

  router.post('/', async (req, res) => {
    try {
      const author = await Author.create(req.body)
      author.save();
      res.status(201).send(author);
    } catch (error) {
      res.status(400).send(error.message)
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const updated = await Author.update(
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
      const deleted = await Author.destroy({
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