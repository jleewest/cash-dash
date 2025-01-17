import { createContext, useContext } from 'react';

export const mocks = {
  //mock empty transactions
  emptyTransactions: [],

  //mock single expense
  singleExpenseTransaction: {
    amount: 250,
    category: 'Bills',
    date: '2024-01-19',
    id: 2,
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

  //mock transactions from different years
  multipleYearTransactions: [
    {
      amount: 250,
      category: 'Bills',
      date: '2023-02-19',
      id: 1,
      note: 'Housing',
      type: 'expense',
    },
    {
      amount: 250,
      category: 'Bills',
      date: '2024-01-19',
      id: 2,
      note: 'Housing',
      type: 'expense',
    },
  ],

  //mock multiple transactions
  multipleTransactions: {
    data: [
      {
        amount: 250,
        category: 'Bills',
        date: '2024-02-19',
        id: 1,
        note: 'Housing',
        type: 'expense',
      },
      {
        amount: 250,
        category: 'Bills',
        date: '2024-01-19',
        id: 2,
        note: 'Housing',
        type: 'expense',
      },
      {
        amount: 1000,
        category: 'Freelancing',
        date: '2024-01-19',
        id: 3,
        note: 'Coding',
        type: 'income',
      },
      {
        amount: 300,
        category: 'Freelancing',
        date: '2024-02-20',
        id: 4,
        note: 'Coding',
        type: 'income',
      },
      {
        amount: 400,
        category: 'Food',
        date: '2024-01-19',
        id: 5,
        note: 'Yummy',
        type: 'expense',
      },
      {
        amount: 600,
        category: 'Food',
        date: '2024-02-20',
        id: 6,
        note: 'Yummy',
        type: 'expense',
      },
      {
        amount: 2300,
        category: 'Salary',
        date: '2024-02-19',
        id: 7,
        note: 'Coding',
        type: 'income',
      },
      {
        amount: 2500,
        category: 'Sale',
        date: '2024-01-20',
        id: 8,
        note: 'Coding',
        type: 'income',
      },
    ],

    incomeTransactions: [
      {
        amount: 1000,
        category: 'Freelancing',
        date: '2024-01-19',
        id: 3,
        note: 'Coding',
        type: 'income',
      },
      {
        amount: 300,
        category: 'Freelancing',
        date: '2024-02-20',
        id: 4,
        note: 'Coding',
        type: 'income',
      },
      {
        amount: 2300,
        category: 'Salary',
        date: '2024-02-19',
        id: 7,
        note: 'Coding',
        type: 'income',
      },
      {
        amount: 2500,
        category: 'Sale',
        date: '2024-01-20',
        id: 8,
        note: 'Coding',
        type: 'income',
      },
    ],

    expenseTransactions: [
      {
        amount: 250,
        category: 'Bills',
        date: '2024-02-19',
        id: 1,
        note: 'Housing',
        type: 'expense',
      },
      {
        amount: 250,
        category: 'Bills',
        date: '2024-01-19',
        id: 2,
        note: 'Housing',
        type: 'expense',
      },
      {
        amount: 400,
        category: 'Food',
        date: '2024-01-19',
        id: 5,
        note: 'Yummy',
        type: 'expense',
      },
      {
        amount: 600,
        category: 'Food',
        date: '2024-02-20',
        id: 6,
        note: 'Yummy',
        type: 'expense',
      },
    ],

    monthExpenses: {
      0: 650,
      1: 850,
    },

    monthIncome: {
      0: 3500,
      1: 2600,
    },

    totalExpenses: '1500.00',

    totalIncome: '6100.00',

    totalBalance: '4600.00€',

    sortedMonths: [0, 1],

    expenseDataByMonth: [650, 850],

    incomeDataByMonth: [3500, 2600],

    groupedExpenses: {
      Bills: 500,
      Food: 1000,
    },

    sortedExpenses: [
      ['Food', 1000],
      ['Bills', 500],
    ],
  },
};

//mock transaction context
const MockTransactionContext = createContext({});
export const useMockTransactionContext = () =>
  useContext(MockTransactionContext);
export { MockTransactionContext };
