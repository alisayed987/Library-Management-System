const express = require('express');
const router = express.Router();
const moment = require('moment');
const { Op } = require("sequelize");

module.exports = (sequelize) => {
    const Book = sequelize.models.Book;
    const Borrower = sequelize.models.Borrower;
    const BookBorrower = sequelize.models.BookBorrower;

    //-----------------<APIs>------------------------------
    /**
     * Borrowing book process
     * Expected keys: [isbn, borrowerId || borrowerEmail, to]
     */
    router.post("/checkOutBook", async (req, res) => {
        let borrowerId = req.body?.borrowerId || await getBorrowerIdByEmail(req.body.borrowerEmail);
        let book = await getAvailableBook(req.body.isbn);
        await borrowBook(book, borrowerId, req.body.to);
        res.status(200).send("book Borrowed successfully");
    })

    /**
     * Returning borrowed book process
     * Expected keys: [isbn, borrowerId || borrowerEmail]
     */
    router.post("/returnBook", async (req, res) => {
        let borrowerId = req.body?.borrowerId || await getBorrowerIdByEmail(req.body.borrowerEmail);
        await returnBook(req.body.isbn, borrowerId)
        res.status(200).send("book returned successfully");
    })

    //------------------<Actions>---------------------------
    /**
     * Get book with isbn that has quantity more than 0
     * @param {string} isbn 
     * @returns Book
     */
    async function getAvailableBook(isbn) {
        const book = await Book.findOne({
            where: {
                isbn10: isbn,
                availableQuantity: {
                    [Op.gt]: 0
                }
            }
        });

        if (!book) {
            throw new Error("Book not available.")
        }
        return book;
    }

    /**
     * Get borrower Id by email
     * @param {string} email 
     * @returns int
     */
    async function getBorrowerIdByEmail(email) {
        const borrower = await Borrower.findOne({
            where: {
                email: email
            }
        });

        if (!borrower) {
            throw new Error("No borrower found with this email.")
        }
        return borrower.id;
    }

    /**
     * Create a borrower book record then decrease book stock quantity by 1
     * @param {Book} book 
     * @param {int} borrowerId 
     * @param {datetime} from 
     * @param {datetime} to 
     * @returns void
     */
    async function borrowBook(book, borrowerId, to) {
        try {
            await BookBorrower.create({
                BookId: book.id,
                BorrowerId: borrowerId,
                from: moment().format('YYYY-MM-DD HH:mm:ss'),
                to: to,
            });
            book.availableQuantity -= 1;
            await book.save();
        } catch (error) {
            throw error;
        }
    }

    /**
     * Save Returned book datetime and increase the book stock quantity by 1
     * @param {string} isbn 
     * @param {int} borrowerId 
     * return void
     */
    async function returnBook(isbn, borrowerId) {
        try {
            const book = await Book.findOne({
                where: {
                    isbn10: isbn
                }
            });

            await BookBorrower.update({
                returnedAt: moment().format('YYYY-MM-DD HH:mm:ss')
            }, {
                where: {
                    bookId: book.id,
                    borrowerId: borrowerId
                }
            });
            book.availableQuantity += 1;
            await book.save();
        } catch (error) {
            throw error;
        }
    }

    return router;
}