import { expect, test, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FormModal from '../components/FormModal';

test('Modal screen renders in expected location', async () => {
  //it('Should render modal on button click', async () => {
  render(<FormModal />);
  const openModalButton = screen.getByText('Add Transaction');
  await fireEvent.click(openModalButton);
  const modal = screen.getByTestId('modal');
  expect(modal).toBeInTheDocument();
  //});
});
