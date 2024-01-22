import { expect, it, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
//import Transactions from '../components/Transactions';
import FormModal from '../components/FormModal';
import { multipleTransactions } from './mocks/index';
import { TransactionsContext } from '../transaction';

describe('Modal screen renders with expected inputs', () => {
  beforeEach(() => {
    const setTransaction = vi.fn();
    render(
      <TransactionsContext.Provider
        value={{ transactions: multipleTransactions, setTransaction }}
      >
        <FormModal isOpen={true} onClose={vi.fn()} selectedTransaction={null} />
      </TransactionsContext.Provider>
    );
  });
  it('Should render expense toggle option', () => {
    expect(screen.getByTestId('expense-toggle')).toBeInTheDocument();
  });
  it('Should render income toggle option', () => {
    expect(screen.getByTestId('income-toggle')).toBeInTheDocument();
  });
  it('Should render date option', () => {
    expect(screen.getByTestId('date-input')).toBeInTheDocument();
  });
  it('Should render category option', () => {
    expect(screen.getByTestId('category-input')).toBeInTheDocument();
  });
  it('Should render amount option', () => {
    expect(screen.getByTestId('amount-input')).toBeInTheDocument();
  });
  it('Should render note option', () => {
    expect(screen.getByTestId('note-input')).toBeInTheDocument();
  });
  it('Should render cancel button', () => {
    expect(screen.getByTestId('cancel-button')).toBeInTheDocument();
  });
  it('Should render save transaction button', () => {
    expect(screen.getByTestId('save-transaction-button')).toBeInTheDocument();
  });

  //it('Should render calendar selection when date input is clicked', () => {
  //  fireEvent.click(screen.getByLabelText('Add Tr'));
  //  const modal = screen.getByTestId('modal');
  //  expect(modal).toBeInTheDocument();
  //});
});

describe('Modal screen inputs render expected response', () => {
  beforeEach(() => {
    const setTransaction = vi.fn();
    render(
      <TransactionsContext.Provider
        value={{ transactions: multipleTransactions, setTransaction }}
      >
        <FormModal isOpen={true} onClose={vi.fn()} selectedTransaction={null} />
      </TransactionsContext.Provider>
    );
  });
  //it('Should render expense toggle option', () => {
  //  //const isExpense = true;

  //  expect(screen.getByTestId('expense-toggle')).toBeInTheDocument();
  //});
  //it('Should render income toggle option', () => {
  //  expect(screen.getByTestId('income-toggle')).toBeInTheDocument();
  //});
  it('Should render selected date in calendar', () => {
    const dateInput = screen.getByTestId('setDate');
    const value = '2024-01-27';
    fireEvent.change(dateInput, {
      target: { value },
    });
    expect(dateInput).toHaveValue('2024-01-27');
  });
  //it('Should render category option', () => {
  //  expect(screen.getByTestId('category-input')).toBeInTheDocument();
  //});
  //it('Should render amount option', () => {
  //  expect(screen.getByTestId('amount-input')).toBeInTheDocument();
  //});
  //it('Should render note option', () => {
  //  expect(screen.getByTestId('note-input')).toBeInTheDocument();
  //});
  //it('should cancel out of form modal', () => {
  //  expect(screen.getByTestId('cancel-button')).toBeInTheDocument();
  //});
  //it('Should render new transaction in transactions component', () => {
  //  expect(screen.getByTestId('save-transaction-button')).toBeInTheDocument();
  //});
});
