import { expect, describe, it, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../../App';

describe('App screen renders on load', () => {
  beforeEach(() => {
    render(<App />);
  });
  it('Should render App', () => {
    const app = screen.getByRole('main');
    expect(app).toBeInTheDocument();
  });
});
