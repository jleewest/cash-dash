import { expect, it } from 'vitest';
import { mocks } from '../mocks/index';
import {
  incomeTransactions,
  expenseTransactions,
  groupByMonth,
  getSortedMonths,
  groupedTransactions,
  sortedCategories,
} from '../../components/Dashboard/ChartUtil';

describe('Charts should calculate and sort data as expected', () => {
  it('should filter transactions by year', () => {
    const transactionsByYear = mocks.multipleYearTransactions.filter(
      (transaction) =>
        new Date(transaction.date).getFullYear().toString() === '2024'
    );
    expect(transactionsByYear).toEqual([mocks.singleExpenseTransaction]);
  });
  it('should properly group categories', () => {
    expect(groupedTransactions(mocks.multipleTransactions.data)).toEqual(
      mocks.multipleTransactions.groupedExpenses
    );
  });
  it('should properly sort categories', () => {
    expect(sortedCategories(mocks.multipleTransactions.data)).toEqual(
      mocks.multipleTransactions.sortedExpenses
    );
  });
  it('should filter transactions by income', () => {
    expect(incomeTransactions(mocks.multipleTransactions.data)).toEqual(
      mocks.multipleTransactions.incomeTransactions
    );
  });
  it('should filter transactions by expense', () => {
    expect(expenseTransactions(mocks.multipleTransactions.data)).toEqual(
      mocks.multipleTransactions.expenseTransactions
    );
  });
  it('should group income transactions by month', () => {
    expect(groupByMonth(mocks.multipleTransactions.incomeTransactions)).toEqual(
      mocks.multipleTransactions.monthIncome
    );
  });
  it('should group expense transactions by month', () => {
    expect(
      groupByMonth(mocks.multipleTransactions.expenseTransactions)
    ).toEqual(mocks.multipleTransactions.monthExpenses);
  });
  it('should sort months included in transaction history', () => {
    expect(
      getSortedMonths(
        mocks.multipleTransactions.monthIncome,
        mocks.multipleTransactions.monthExpenses
      )
    ).toEqual(mocks.multipleTransactions.sortedMonths);
  });
  it('should return array of income per month', () => {
    const incomeData = mocks.multipleTransactions.sortedMonths.map(
      (month) => mocks.multipleTransactions.monthIncome[month] || 0
    );
    expect(incomeData).toEqual(mocks.multipleTransactions.incomeDataByMonth);
  });
  it('should return array of expenses per month', () => {
    const expenseData = mocks.multipleTransactions.sortedMonths.map(
      (month) => mocks.multipleTransactions.monthExpenses[month] || 0
    );
    expect(expenseData).toEqual(mocks.multipleTransactions.expenseDataByMonth);
  });
});
