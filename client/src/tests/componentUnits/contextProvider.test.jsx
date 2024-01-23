import { expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { mocks } from '../mocks/index';
import Transactions from '../../components/Transactions';
import { TransactionsContext } from '../../transaction';

describe('Context Provider', () => {
  beforeEach(() => {
    const setTransaction = vi.fn();
    render(
      <TransactionsContext.Provider
        value={{
          transactions: mocks.multipleTransactions.data,
          setTransaction,
        }}
      >
        <Transactions />
      </TransactionsContext.Provider>
    );
  });
  it('should provides expected context value to child element', () => {
    expect(screen.getByText('Sale')).toBeInTheDocument();
  });
});
