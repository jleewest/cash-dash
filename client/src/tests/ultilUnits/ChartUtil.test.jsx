import { expect, it } from 'vitest';
import { mocks } from '../mocks/index';
import {
  incomeTransactions,
  expenseTransactions,
} from '../../components/Dashboard/BarChart';
import {
  groupByMonth,
  getSortedMonths,
} from '../../components/Dashboard/ChartUtil';

describe('Charts should calculate data as expected', () => {
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
});
