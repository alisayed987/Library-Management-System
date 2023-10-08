const bcrypt = require('bcrypt');
const express = require('express');
const _ = require('lodash')
const router = express.Router();

module.exports = (sequelize) => {
  const Borrower = sequelize.models.Borrower;

  /**
   * req: Login using email & password
   * res: jwt token
   */
  router.post('/login', async (req, res) => {
    const borrower = await Borrower.findOne({ where: { email: req.body.email }});
    if (!borrower) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, borrower.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    const token = borrower.generateAuthToken();
    res.send(token);
  });

  /**
   * req: Register using name & email & password & phone_number
   * res: new borrower + header token
   */
  router.post('/register', async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);

      const borrower = await Borrower.create({
        name: req.body.name,
        email: req.body.email,
        password: password,
      });

      const token = borrower.generateAuthToken();
      res.header('x-auth-token', token).send(_.pick(borrower, ['id', 'name', 'email']));
    } catch (error) {
      res.status(500).send(error);
    }
  });

  return router;
}
