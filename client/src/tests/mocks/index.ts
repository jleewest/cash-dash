import { createContext, useContext } from 'react';

export const mocks = {
  //mock empty transactions
  emptyTransactions: [],

  //mock single expense
  singleExpenseTransaction: {
    amount: 10,
    category: 'Bills',
    date: '2024-01-19',
    id: 1,
    note: 'Housing',
    type: 'expense',
  },

  //mock single income
  singleIncomeTransaction: {
    amount: 100,
    category: 'Freelancing',
    date: '2024-01-19',
    id: 2,
    note: 'Coding',
    type: 'income',
  },

  //mock multiple transactions
  multipleTransactions: {
    data: [
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
        amount: 400,
        category: 'Food',
        date: '2024-01-19',
        id: 3,
        note: 'Yummy',
        type: 'expense',
      },
    ],

    groupedExpenses: {
      Bills: 250,
      Food: 400,
    },

    sortedExpenses: [
      ['Food', 400],
      ['Bills', 250],
    ],
  },
};

//mock transaction context
const MockTransactionContext = createContext({});
export const useMockTransactionContext = () =>
  useContext(MockTransactionContext);
export { MockTransactionContext };
