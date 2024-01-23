import { expect, it, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import LineChart from '../../components/Dashboard/LineChart';
import { mocks } from '../mocks/index';
import { TransactionsContext } from '../../transaction';
import { afterEach } from 'node:test';

//Todo: add integration testing: check that save transaction renders form input into transaction display

describe('Dashboard screen renders line chart with expected inputs', () => {
  beforeEach(() => {
    const setTransaction = vi.fn();
    render(
      <TransactionsContext.Provider
        value={{
          transactions: mocks.multipleTransactions.data,
          setTransaction,
        }}
      >
        <LineChart transactionsByYear={mocks.multipleTransactions.data} />
      </TransactionsContext.Provider>
    );
  });
  afterEach(cleanup);
  it('should render line chart', () => {
    expect(screen.getByTestId('line-chart')).toBeInTheDocument();
  });
});
