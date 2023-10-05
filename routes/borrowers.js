const express = require('express');
const router = express.Router();

module.exports = (sequelize) => {
  const Borrower = sequelize.models.Borrower;

  router.get('/', async (req, res) => {
    const borrowers = await Borrower.findAll();
    res.send(borrowers);
  });

  router.get('/:id', async (req, res) => {
    const borrower = await Borrower.findByPk(req.params.id);
    res.send(borrower);
  });

  router.post('/', async (req, res) => {
    try {
      /**
       * Check if there is a book already with the same ISBN
       */
      const fountBorrower = Borrower.findOne({
        where: {
          email: req.body.email
        }
      });

      if (fountBorrower) {
        res.status(200).send("borrower already exists");
        return;
      }

      const borrower = await Borrower.create(req.body)
      borrower.save();
      res.status(201).send(borrower);
    } catch (error) {
      res.status(400).send(error.message)
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const updated = await Borrower.update(
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
      const deleted = await Borrower.destroy({
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