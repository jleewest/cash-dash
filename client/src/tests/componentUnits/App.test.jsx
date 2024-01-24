import { expect, describe, it, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../../App';
import nock from 'nock';
import { mocks } from '../mocks/index';

//Test failing: Errors in using nock -- rendered App with data one time but still was not able to getByTest the text that was visible in the return. All other attempts have rendered App without any data

nock('http://localhost:3000/transactions')
  .persist()
  .defaultReplyHeaders({
    'access-control-allow-origin': '*',
  })
  .get('/')
  .reply(200, mocks.multipleTransactions.data);

describe('Main App Test', () => {
  beforeEach(() => {
    render(<App />);
  });
  it('should render App', () => {
    const app = screen.getByRole('main');
    expect(app).toBeInTheDocument();
  });
  it('should render expected transactions in app', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Bills')).toBeInTheDocument();
      expect(screen.getByText('Freelancing')).toBeInTheDocument();
      expect(screen.getByText('Food')).toBeInTheDocument();
      expect(screen.getByText('Salary')).toBeInTheDocument();
    });
  });
});
