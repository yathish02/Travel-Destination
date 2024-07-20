import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

describe('Header', () => {
  test('renders the header with correct text', () => {
    render(<Header />);
    const headerElement = screen.getByText(/Travel Recommendation/i);
    expect(headerElement).toBeInTheDocument();
  });
});
