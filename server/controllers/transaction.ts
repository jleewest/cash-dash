'use strict';
import { Request, Response } from 'express';
import Transaction from '../models/transaction';

// Todo: backend validation

// Get all transactions
export async function getAllTransactions(req: Request, res: Response): Promise<void> {
  try {
    const transactions = await Transaction.findAll();
    res.status(200);
    res.send(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

// Create a transaction
export async function createTransaction(req: Request, res: Response): Promise<void> {
  try {
    const transaction = await Transaction.create(req.body);
    res.status(201);
    res.send(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

// Update a transaction
export async function updateTransaction(req: Request, res: Response): Promise<void> {
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
    console.error(error);
    res.status(500).send(error.message);
  }
}

// Delete a transaction
export async function deleteTransaction(req: Request, res: Response): Promise<void> {
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
    console.error(error);
    res.status(500).send(error.message);
  }
}

