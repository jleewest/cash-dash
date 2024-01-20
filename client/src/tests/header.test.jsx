import { expect, test, describe, it, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
//import { Header } from '../components/Header';
import App from '../App';

describe('App', () => {
  beforeEach(() => {
    render(<App />);
  });
  it('Should render App', () => {
    console.log('😅');
    //render(<App />);
    const header = screen.getByRole('main');
    expect(header).toBeInTheDocument();
  });
});
