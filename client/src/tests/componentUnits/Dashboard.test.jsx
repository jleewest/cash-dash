import { expect, it, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Dashboard from '../../components/Dashboard';
import { mocks } from '../mocks/index';
import { TransactionsContext } from '../../transaction';

//Todo: add integration testing: check that save transaction renders form input into transaction display

describe('Dashboard screen renders expected displays', () => {
  beforeEach(() => {
    const setTransaction = vi.fn();
    render(
      <TransactionsContext.Provider
        value={{
          transactions: mocks.multipleTransactions.data,
          setTransaction,
        }}
      >
        <Dashboard />
      </TransactionsContext.Provider>
    );
  });
  it('Should display set year button', () => {
    expect(screen.getByTestId('set-year-button')).toBeInTheDocument();
  });
  it('Should display Total Balance', () => {
    //expect(screen.getByTestId('income-toggle')).toBeInTheDocument();
  });
  it('Should display Total Income', () => {
    expect(screen.getByText('Total Income')).toBeInTheDocument();
  });
  it('Should display Total Expenses', () => {
    expect(screen.getByText('Total Expenses')).toBeInTheDocument();
  });
  it('Should display Top 5 Expense Categories', () => {
    expect(screen.getByTestId('doughnut-chart')).toBeInTheDocument();
  });
  it('Should display Income vs. Expenses', () => {
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
  });
  it('Should display Monthly Cash Flow', () => {
    expect(screen.getByTestId('line-chart')).toBeInTheDocument();
  });
  it('Should display Recent Transactions', () => {
    expect(
      screen.getByTestId('dashboard-recent-transactions')
    ).toBeInTheDocument();
  });
});

describe('Dashboard screen renders with expected outputs', () => {
  beforeEach(() => {
    const setTransaction = vi.fn();
    render(
      <TransactionsContext.Provider
        value={{
          transactions: mocks.multipleTransactions.data,
          setTransaction,
        }}
      >
        <Dashboard />
      </TransactionsContext.Provider>
    );
  });
  it('Should render expected date', () => {
    const today = new Date().toLocaleString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
    expect(screen.getByText(today)).toBeInTheDocument();
  });
  it('Should render expected net balance', () => {
    //expect(screen.getByTestId('income-toggle')).toBeInTheDocument();
  });
  it('Should render expected total income', () => {
    expect(
      screen.getByText(mocks.multipleTransactions.totalIncome)
    ).toBeInTheDocument();
  });
  it('Should render expected total expenses', () => {
    expect(
      screen.getByText(mocks.multipleTransactions.totalExpenses)
    ).toBeInTheDocument();
  });
  it('Should render expected categories', () => {
    //expect(screen.getByTestId('category-input')).toBeInTheDocument();
  });
  it('Should render income and expenses for all months', () => {
    //expect(screen.getByTestId('amount-input')).toBeInTheDocument();
  });
  it('Should render graph of all months', () => {
    //expect(screen.getByTestId('note-input')).toBeInTheDocument();
  });
  it('Should render list of recent transactions', () => {
    expect(screen.getAllByText('Freelancing')[0]).toBeInTheDocument();
  });
});
