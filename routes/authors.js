const express = require('express');
const router = express.Router();

module.exports = (sequelize) => {
  const Author = sequelize.models.Author;

  /**
   * GET all authors
   */
  router.get('/', async (req, res) => {
    const authors = await Author.findAll();
    res.send(authors);
  });

  /**
   * GET an author by id
   */
  router.get('/:id', async (req, res) => {
    const author = await Author.findByPk(req.params.id);
    res.send(author);
  });

  /**
   * CREATE an author if doesn't exist (unique name)
   */
  router.post('/', async (req, res) => {
    try {
      /**
       * Check if there is a author already with the same Name
       */
      const foundAuthor = await Author.findOne({
        where: {
          name: req.body.name
        }
      });

      if (foundAuthor) {
        res.status(200).send("author already exists");
        return;
      }

      const author = await Author.create(req.body)
      author.save();
      res.status(201).send(author);
    } catch (error) {
      res.status(400).send(error.message)
    }
  });

  /**
   * UPDATE author by id
   */
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

  /**
   * DELETE author by id
   */
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