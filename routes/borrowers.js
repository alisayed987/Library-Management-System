const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const _ = require('lodash')

const { Op } = require("sequelize");

module.exports = (sequelize) => {
  const Borrower = sequelize.models.Borrower;
  const BookBorrower = sequelize.models.BookBorrower;

  /**
   * GET all borowers
   */
  router.get('/', async (req, res) => {
    const borrowers = await Borrower.findAll({
      attributes: ['id', 'name', 'email']
    });
    res.send(borrowers);
  });

  /**
   * GET a borrower by id
   */
  router.get('/:id', async (req, res) => {
    const borrower = await Borrower.findByPk(req.params.id, {
      attributes: ['id', 'name', 'email']
    });
    res.send(borrower);
  });

  /**
   * GET a borrower's current borrowed books
   */
  router.get('/:id/borrowedBooks', async (req, res) => {
    const allBorrowerBooks = await BookBorrower.findAll({
      include: [
        {
          model: sequelize.models.Book,
        },
        {
          model: sequelize.models.Borrower,
          attributes: ['id', 'name', 'email']
        }
      ],
      where: {
        BorrowerId: req.params.id,
        returnedAt: { [Op.is]: null }
      }
    });
    res.send(allBorrowerBooks);
  });

  /**
   * CREATE borrower if does not exist (unique email)
   */
  router.post('/', auth, async (req, res) => {
    /**
     * Check if there is a book already with the same ISBN
     */
    const fountBorrower = await Borrower.findOne({
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
    res.status(201).send(_.pick(borrower, ['id', 'name', 'email']));
  });

  /**
   * UPDATE a borrower by id
   */
  router.put('/:id', auth, async (req, res) => {
    const updated = await Borrower.update(
      req.body,
      {
        where: {
          id: req.params.id
        }
      });
    res.status(202).send(updated);
  });

  /**
   * DELETE a borrower by id
   */
  router.delete('/:id', auth, async (req, res) => {
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
  });

  return router;
}