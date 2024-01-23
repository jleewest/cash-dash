import { Transaction } from '../../transaction';

// Group transactions by month and calculate total income and expenses
export const groupByMonth = (transactions: Transaction[]) => {
  return transactions.reduce(
    (acc, transaction) => {
      const month = new Date(transaction.date).getMonth();
      if (!acc[month]) acc[month] = 0;
      // Use absolute value of amount
      acc[month] += Math.abs(transaction.amount);
      return acc;
    },
    {} as Record<number, number>
  );
};

// Get all unique months from income and expenses transactions, and sort them
export const getSortedMonths = (
  incomeGrouped: Record<number, number>,
  expensesGrouped: Record<number, number>
) => {
  const individualMonths = [
    ...new Set([
      ...Object.keys(incomeGrouped).map(Number),
      ...Object.keys(expensesGrouped).map(Number),
    ]),
  ];
  return individualMonths.sort((a, b) => a - b);
};

// Split transactions into income and expenses
export const incomeTransactions = (transactionsByYear: Transaction[]) => {
  return transactionsByYear.filter(
    (transaction) => transaction.type === 'income'
  );
};
export const expenseTransactions = (transactionsByYear: Transaction[]) => {
  return transactionsByYear.filter(
    (transaction) => transaction.type === 'expense'
  );
};
