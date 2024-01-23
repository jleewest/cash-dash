import { expect, it, beforeEach } from 'vitest';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import NavBar from '../../components/NavBar';
import { BrowserRouter } from 'react-router-dom';
import { afterEach } from 'node:test';

//Todo: add integration testing: dashboard link opens dashboard component
//Todo: add integration testing: transactions link opens transactions component

describe('Navbar screen renders as expected', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
  });
  afterEach(cleanup);
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

//describe('Navbar links render correct pages', () => {
//  beforeEach(() => {
//    render(
//      <BrowserRouter>
//        <NavBar />
//      </BrowserRouter>
//    );
//  });
//  afterEach(cleanup);
//  it('Should render Dashboard when click Dashboard link', () => {
//    const dashboardLink = screen.getByTestId('navbar-dashboard');
//    fireEvent.click(dashboardLink);
//    expect(screen.queryByTestId('dashboard-container')).toBeInTheDocument();
//  });
//  it('Should render Transactions when click Transactions link', () => {
//    const transactionsLink = screen.getByTestId('navbar-transactions');
//    fireEvent.click(transactionsLink);
//    expect(screen.queryByTestId('transactions-container')).toBeInTheDocument();
//  });
//});
