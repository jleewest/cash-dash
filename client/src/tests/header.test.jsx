import { expect, describe, it, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  beforeEach(() => {
    render(<App />);
  });
  it('Should render App', () => {
    console.log('😅');
    const header = screen.getByRole('main');
    expect(header).toBeInTheDocument();
  });
});
