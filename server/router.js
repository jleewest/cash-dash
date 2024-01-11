'use strict';
const express = require('express');
const {
  getAllTransactions,
  getAllCategories,
} = require('./controllers/transaction');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello, world!');
});

router.get('/transactions', getAllTransactions);
router.get('/categories', getAllCategories);

module.exports = router;
