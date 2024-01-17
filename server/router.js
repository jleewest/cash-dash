'use strict';
const express = require('express');
const {
  getAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} = require('./controllers/transaction');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello, world!');
});

router.get('/transactions', getAllTransactions);
router.post('/transactions', createTransaction);
router.put('/transactions/:id', updateTransaction);
router.delete('/transactions/:id', deleteTransaction);

module.exports = router;
