import { expect, beforeEach, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Transactions from '../components/Transactions';
//import FormModal from '../components/FormModal';
import { MockTransactionContext, multipleTransactions } from './mocks/index';
import { Transaction, TransactionsContext } from '../transaction';

describe('Modal screen renders in expected location', () => {
  //beforeEach(() => {
  //  const mockContextValue = {
  //    multipleTransactions,
  //  };

  //});
  it('Should render modal on button click', () => {
    const setTransaction = vi.fn();
    render(
      <TransactionsContext.Provider
        value={{ transactions: multipleTransactions, setTransaction }}
      >
        <Transactions />
      </TransactionsContext.Provider>
    );
    //const openModalButton = screen.getByTestId('transaction-button');
    fireEvent.click(screen.getByText('Add Transaction'));
    //fireEvent(
    //  screen.getByText(screen, 'Add Transaction'),
    //  new MouseEvent('click', {
    //    bubbles: true,
    //    cancelable: true,
    //  })
    //);
    const modal = screen.getByTestId('modal');
    expect(modal).toBeInTheDocument();
  });
});
