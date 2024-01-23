import { expect, it, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import DoughnutChart, {
  groupedTransactions,
  sortedCategories,
} from '../../components/Dashboard/DoughnutChart';
import {
  emptyTransactions,
  groupedExpenses,
  multipleTransactions,
  sortedExpenses,
} from '../mocks/index';
import { TransactionsContext } from '../../transaction';
import { afterEach } from 'node:test';

//Todo: add integration testing: check that save transaction renders form input into transaction display

describe('Dashboard screen renders doughnut chart expected display with zero transactions', () => {
  beforeEach(() => {
    const setTransaction = vi.fn();
    render(
      <TransactionsContext.Provider
        value={{ transactions: multipleTransactions, setTransaction }}
      >
        <DoughnutChart transactionsByYear={emptyTransactions} />
      </TransactionsContext.Provider>
    );
  });
  afterEach(cleanup);
  it('should render doughnut chart display when no transactions are entered', () => {
    expect(screen.getByTestId('doughnut-chart')).toBeInTheDocument();
  });
});

describe('Dashboard screen renders doughnut chart with expected inputs when transactions are present', () => {
  beforeEach(() => {
    const setTransaction = vi.fn();
    render(
      <TransactionsContext.Provider
        value={{ transactions: multipleTransactions, setTransaction }}
      >
        <DoughnutChart transactionsByYear={multipleTransactions} />
      </TransactionsContext.Provider>
    );
  });
  afterEach(cleanup);
  it('should render doughnut chart with transactions', () => {
    expect(screen.getByTestId('doughnut-chart')).toBeInTheDocument();
  });
});

describe('Doughnut chart sorts transactions as expected', () => {
  it('should properly group categories', () => {
    expect(groupedTransactions(multipleTransactions)).toEqual(groupedExpenses);
  });

  it('should properly sort categories', () => {
    expect(sortedCategories(multipleTransactions)).toEqual(sortedExpenses);
  });
});
