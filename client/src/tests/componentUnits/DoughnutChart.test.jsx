import { expect, it, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import DoughnutChart from '../../components/Dashboard/DoughnutChart';
import { emptyTransactions, multipleTransactions } from '../mocks/index';
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
  it('should properly sort categories', () => {
    console.log(multipleTransactions);
    const transactionsByYear = multipleTransactions;
    const groupedTransactions = transactionsByYear.reduce(
      (acc, transaction) => {
        if (transaction.type === 'expense') {
          acc[transaction.category] =
            (acc[transaction.category] || 0) + Math.abs(transaction.amount);
        }
        return acc;
      }
    );
    const sortedCategories = Object.entries(groupedTransactions).sort(
      (a, b) => b[1] - a[1]
    );

    //const doughnutChart = screen.getByTestId('doughnut-chart');
    expect(sortedCategories).toEqual({
      Bills: 250,
      Food: 30,
    });
  });
});
