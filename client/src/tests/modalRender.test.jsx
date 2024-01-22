import { expect, it, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FormModal from '../components/FormModal';
import { multipleTransactions } from './mocks/index';
import { TransactionsContext } from '../transaction';

//Todo: add integration testing: check that save transaction renders form input into transaction display

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
});

describe('Modal screen inputs render expected response', () => {
  beforeEach(() => {
    const setTransaction = vi.fn();
    render(
      <TransactionsContext.Provider
        value={{ transactions: multipleTransactions, setTransaction }}
      >
        <FormModal
          isOpen={true}
          onClose={vi.fn()}
          selectedTransaction={null}
          isExpense={true}
        />
      </TransactionsContext.Provider>
    );
  });
  it('Should toggle switch between expense and income', () => {
    const toggleModal = screen.getByTestId('modal-toggle-switch');
    expect(toggleModal).not.toHaveAttribute('data-checked');
    fireEvent.click(toggleModal);
    expect(toggleModal).toHaveAttribute('data-checked');
  });
  it('Should render expense categories when toggled to expense', () => {
    const toggleModal = screen.getByTestId('modal-toggle-switch');
    expect(toggleModal).not.toHaveAttribute('data-checked');
    const categories = screen.getByTestId('category-options');
    fireEvent.click(categories);
    expect(screen.getByText('Bills')).toBeInTheDocument();
  });
  it('Should render income categories when toggled to income', () => {
    const toggleModal = screen.getByTestId('modal-toggle-switch');
    fireEvent.click(toggleModal);
    expect(toggleModal).toHaveAttribute('data-checked');
    const categories = screen.getByTestId('category-options');
    fireEvent.click(categories);
    expect(screen.getByText('Freelancing')).toBeInTheDocument();
  });
  it('Should render selected date in calendar', () => {
    const dateInput = screen.getByTestId('setDate');
    const value = '2024-01-27';
    fireEvent.change(dateInput, {
      target: { value },
    });
    expect(dateInput).toHaveValue('2024-01-27');
  });
  it('Should render entered amount in form', () => {
    const amountInput = screen.getByTestId('setAmount');
    const value = 12;
    fireEvent.change(amountInput, {
      target: { value },
    });
    expect(amountInput).toHaveValue(12);
  });
  it('Should render input entered in note form', () => {
    const noteInput = screen.getByTestId('setNote');
    const value = 'Test note';
    fireEvent.change(noteInput, {
      target: { value },
    });
    expect(noteInput).toHaveValue('Test note');
  });
  it('Should cancel out of form modal when click cancel-button', () => {
    const cancelButton = screen.getByTestId('cancel-button');
    fireEvent.click(cancelButton);
    expect(screen.queryByTestId('modal')).toBeNull();
  });
  it('Should cancel out of form modal when click save-transaction-button', () => {
    const saveTransactionButton = screen.getByTestId('save-transaction-button');
    fireEvent.click(saveTransactionButton);
    expect(screen.queryByTestId('modal')).toBeNull();
  });
});
