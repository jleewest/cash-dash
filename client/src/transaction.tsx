import React from 'react';

export class Transaction {
  'amount': number;
  'category': string;
  'date': string;
  'id': number;
  'note': string;
  'type': string;
}

export type TransactionContext = {
  transactions: Transaction[];
};

export const TransactionsContext =
  React.createContext<TransactionContext | null>(null);
