'use strict';
const { Transaction, Category } = require('../models/transaction');

async function getAllTransactions(req, res) {
  try {
    const transactions = await Transaction.findAll();
    res.status(200);
    res.send(transactions);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}

async function getAllCategories(req, res) {
  try {
    const transactions = await Category.findAll();
    res.status(200);
    res.send(transactions);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}

module.exports = { getAllTransactions, getAllCategories };
