const express = require('express');
const router = express.Router();
const moment = require('moment')

const { Op } = require("sequelize");

module.exports = (sequelize) => {
  const Book = sequelize.models.Book;
  const BookBorrower = sequelize.models.BookBorrower;

  /**
   * GET all books || filtered books
   * 
   * Available filters keys (query string):
   *  - books -> [isbn, titleLike, title, authorId]
   *  - author -> [authorNameLike, authorName]
   */
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
      if (filters['titleLike']) booksQueryConditions.title = { [Op.substring]: filters['titleLike'] };
      if (filters['title']) booksQueryConditions.title = filters['title'];
      if (filters['authorId']) booksQueryConditions.authorId = filters['authorId'];

      // NOTE:: authorLike must be author title because if we recieve both author should override authorLike
      if (filters['authorNameLike']) authorName.name = { [Op.substring]: filters['authorNameLike'] };
      
      // (for performance) If "Id" set no need to filter by name if set;
      if (!filters['authorId']) {
        if (filters['authorName']) authorName.name = filters['authorName'];
      } 
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

  /**
   * GET all overdued borrowed books
   */
  router.get('/overdue', async (req, res) => {
    const overduedBooks = await BookBorrower.findAll({
      include: [
        {
          model: sequelize.models.Book,
        }
      ],
      where: {
        returnedAt: { [Op.is]: null },
        to: { [Op.lt]: moment() }
      }
    });
    res.send(overduedBooks);
  });

  /**
   * GET a book by id
   */
  router.get('/:id', async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    res.send(book);
  });

  /**
   * CREATE book if does not exist (unique isbn)
   */
  router.post('/', async (req, res) => {
    /**
     * Check if there is a book already with the same ISBN
     */
    const foundBook = await Book.findOne({
      where: {
        isbn10: req.body.isbn10
      }
    });

    if (foundBook) {
      res.status(200).send("book already exists");
      return;
    }
    const book = await Book.create(req.body)
    book.save();
    res.status(201).send(book);
  });

  /**
   * UPDATE a book by id
   */
  router.put('/:id', async (req, res) => {
    const updated = await Book.update(
      req.body,
      {
        where: {
          id: req.params.id
        }
      });
    res.status(202).send(updated);
  });

  /**
   * DELETE a book by id
   */
  router.delete('/:id', async (req, res) => {
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
  });

  return router;
}