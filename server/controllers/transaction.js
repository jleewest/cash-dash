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

async function createCategory(req, res) {
  try {
    const category = await Category.create(req.body);
    res.status(201);
    res.send(category);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}

async function updateCategory(req, res) {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      res.status(400).end();
      return;
    }
    await category.update(req.body);
    res.status(200);
    res.send(category);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}

async function deleteCategory(req, res) {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      res.status(400).end();
      return;
    }
    await Category.destroy({ where: { id } });
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
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
