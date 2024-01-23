import { createContext, useContext } from 'react';

//mock empty transactions
export const emptyTransactions = [];

//mock single expense
export const singleExpenseTransaction = {
  amount: 10,
  category: 'Bills',
  date: '2024-01-19',
  id: 1,
  note: 'Housing',
  type: 'expense',
};

//mock single income
export const singleIncomeTransaction = {
  amount: 100,
  category: 'Freelancing',
  date: '2024-01-19',
  id: 2,
  note: 'Coding',
  type: 'income',
};

//mock multiple transactions
export const multipleTransactions = [
  {
    amount: 250,
    category: 'Bills',
    date: '2024-01-19',
    id: 1,
    note: 'Housing',
    type: 'expense',
  },
  {
    amount: 1000,
    category: 'Freelancing',
    date: '2024-01-19',
    id: 2,
    note: 'Coding',
    type: 'income',
  },
  {
    amount: 30,
    category: 'Food',
    date: '2024-01-19',
    id: 3,
    note: 'Yummy',
    type: 'expense',
  },
];

//mock transaction context
const MockTransactionContext = createContext({});
export const useMockTransactionContext = () =>
  useContext(MockTransactionContext);
export { MockTransactionContext };
