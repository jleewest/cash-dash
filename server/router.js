'use strict';
const express = require('express');
const {
  getAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('./controllers/transaction');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello, world!');
});

router.get('/transactions', getAllTransactions);
router.post('/transactions', createTransaction);
router.put('/transactions/:id', updateTransaction);
router.delete('/transactions/:id', deleteTransaction);

router.get('/categories', getAllCategories);
router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

module.exports = router;
