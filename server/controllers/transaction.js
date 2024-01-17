'use strict';
const Transaction = require('../models/transaction');

// Todo: backend validation

// Get all transactions
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

// Create a transaction
async function createTransaction(req, res) {
  try {
    const transaction = await Transaction.create(req.body);
    res.status(201);
    res.send(transaction);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}

// Update a transaction
async function updateTransaction(req, res) {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByPk(id);
    if (!transaction) {
      res.status(400).end();
      return;
    }
    await transaction.update(req.body);
    res.status(200);
    res.send(transaction);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}

// Delete a transaction
async function deleteTransaction(req, res) {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByPk(id);
    if (!transaction) {
      res.status(400).end();
      return;
    }
    await Transaction.destroy({ where: { id } });
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}

module.exports = {
  getAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
