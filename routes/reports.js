const express = require('express');
const router = express.Router();
const fs = require('fs');
const moment = require('moment')

const { Op } = require("sequelize");

module.exports = (sequelize) => {
    const BookBorrower = sequelize.models.BookBorrower;

    /**
     * Genearte a report of borrowing process and return download link (public link)
     * Options:
     *  - Export all borrowing processes between a perion
     *  - Export all overdue borrowing process that has happened or is still happening between a period
     */
    router.get('/generateReport', async (req, res) => {
        let filters = req.query;
        let queryConditions = {};
        
        let pastOverdueConditions = {
            [Op.or]: [
                { returnedAt: { [Op.is]: null } },
                { returnedAt: { [Op.gt]: sequelize.col('to') } }
            ]
        };

        /**
         * Available books filter keys
         */
        if (filters) {
            if (filters['from']) queryConditions.from = { [Op.gt]: moment(filters['from']) };
            if (filters['to']) queryConditions.to = { [Op.lt]: moment(filters['to']) };
            
            if (filters['overdue'] === true) {
                queryConditions = {
                    ...queryConditions,
                    ...pastOverdueConditions
                }
            }
        }

        const borrowingData = await BookBorrower.findAll({
            attributes: ['from', 'to', 'returnedAt'],
            include: [
                {
                    model: sequelize.models.Book,
                    attributes: ['title', 'isbn10']
                },
                {
                    model: sequelize.models.Borrower,
                    attributes: ['name']
                },
            ],
            where: queryConditions
          });

        const filePath = saveAsCSV(borrowingData);
        const host = req.get('host');

        res.send(`${host}/${filePath}`);
    });

    /**
     * Save data to CSV (overwrite) and return file name
    * @param {BookBorrowers} borrowingData 
     * @returns string
     */
    function saveAsCSV(borrowingData) {
        try {
            
            let csvData = "borrower name, book title, book ISBN, borrowed from, borrowed to, returned at\n"
            borrowingData.forEach(function (row) {
                csvData += 
                    row.Borrower.name + ","
                    + row.Book.title + ","
                    + row.Book.isbn10 + ","
                    + (moment(row.from).format('YYYY-MM-DD HH:mm:ss').toString()) + ","
                    + (moment(row.to).format('YYYY-MM-DD HH:mm:ss').toString()) + ","
                    + (row.returnedAt ? moment(row.returnedAt).format('YYYY-MM-DD HH:mm:ss') : "--") +
                    "\n";
            });
            fs.writeFileSync('./public/borrowing-process-report.csv', csvData);
            return "borrowing-process-report.csv";
        } catch (error) {
            throw error;
        }
    }

    return router;
}