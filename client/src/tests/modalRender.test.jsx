import { expect, beforeEach, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FormModal from '../components/FormModal';
import { MockTransactionContext, multipleTransactions } from './mocks/index';

describe('Modal screen renders in expected location', async () => {
  //beforeEach(() => {
  //  const mockContextValue = {
  //    multipleTransactions,
  //  };

  //});
  it('Should render modal on button click', () => {
    render(
      <MockTransactionContext.Provider value={multipleTransactions}>
        <FormModal />
      </MockTransactionContext.Provider>
    );
    const openModalButton = screen.getByText('Add Transaction');
    fireEvent.click(openModalButton);
    const modal = screen.getByTestId('modal');
    expect(modal).toBeInTheDocument();
  });
});
