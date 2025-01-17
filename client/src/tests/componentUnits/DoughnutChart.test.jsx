import { expect, it, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import DoughnutChart from '../../components/Dashboard/DoughnutChart';
import { mocks } from '../mocks/index';
import { TransactionsContext } from '../../transaction';
import { afterEach } from 'node:test';

//Todo: add integration testing: check that save transaction renders form input into transaction display

describe('Dashboard screen renders doughnut chart expected display with zero transactions', () => {
  beforeEach(() => {
    const setTransaction = vi.fn();
    render(
      <TransactionsContext.Provider
        value={{
          transactions: mocks.multipleTransactions.data,
          setTransaction,
        }}
      >
        <DoughnutChart transactionsByYear={mocks.emptyTransactions} />
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
        value={{
          transactions: mocks.multipleTransactions.data,
          setTransaction,
        }}
      >
        <DoughnutChart transactionsByYear={mocks.multipleTransactions.data} />
      </TransactionsContext.Provider>
    );
  });
  afterEach(cleanup);
  it('should render doughnut chart with transactions', () => {
    expect(screen.getByTestId('doughnut-chart')).toBeInTheDocument();
  });
});
