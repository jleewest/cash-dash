import { expect, it, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from '../../components/Header';

describe('Header screen renders as expected', () => {
  beforeEach(() => {
    render(<Header />);
  });
  it('Should render logo', () => {
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });
  it('Should render app name', () => {
    expect(screen.getByTestId('app-name')).toBeInTheDocument();
  });
});
