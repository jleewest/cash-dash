import { expect, beforeEach, it } from 'vitest';
import { render } from '@testing-library/react';
import App from '../App';
import {
  MockTransactionContext,
  multipleTransactions,
  singleExpenseTransaction,
} from './mocks/index';

function renderTestingComponent(transaction) {
  //const { amount, category, date, id, note, type } = useContext(MockTransactionContext);
  return render(
    <MockTransactionContext.Provider value={transaction}>
      <p>{MockTransactionContext.amount}</p>
      <p>{MockTransactionContext.category}</p>
      <p>{MockTransactionContext.date}</p>
      <p>{MockTransactionContext.id}</p>
      <p>{MockTransactionContext.note}</p>
      <p>{MockTransactionContext.type}</p>
    </MockTransactionContext.Provider>
  );
}

describe('<TransactionsContext.Provider />', () => {
  test('provides expected context obj to child element', () => {
    renderTestingComponent(singleExpenseTransaction);
    expect(renderTestingComponent).toEqual(
      <>
        <p>10</p>
        <p>Bills</p>
        <p>2024-01-19</p>
        <p>1</p>
        <p>Housing</p>
        <p>expense</p>
      </>
    );

    //render(
    //	<MockTransactionContext.Provider value={multipleTransactions}>
    //  <>
    //    <p>{singleExpenseTransaction.amount}</p>
    //  </>
    //</MockTransactionContext.Provider>;
    //	);
    //	expect()
  });
});
