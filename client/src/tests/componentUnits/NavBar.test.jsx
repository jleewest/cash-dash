import { expect, it, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import NavBar from '../../components/NavBar';
import { BrowserRouter } from 'react-router-dom';

describe('Navbar screen renders as expected', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
  });
  it('Should render Dashboard link', () => {
    expect(screen.getByTestId('navbar-dashboard')).toBeInTheDocument();
  });
  it('Should render Transactions link', () => {
    expect(screen.getByTestId('navbar-transactions')).toBeInTheDocument();
  });
  it('Should render user information', () => {
    expect(screen.getByTestId('user')).toBeInTheDocument();
  });
  it('Should render signout option', () => {
    expect(screen.getByTestId('signout')).toBeInTheDocument();
  });
});
