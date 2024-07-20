import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DestinationCard from './DestinationCard';

describe('DestinationCard', () => {
  const defaultProps = {
    name: 'Taj Mahal',
  };

  test('renders the destination card with correct name', () => {
    render(<DestinationCard {...defaultProps} />);

    // Check if the destination name is rendered
    const nameElement = screen.getByText('Taj Mahal');
    expect(nameElement).toBeInTheDocument();

  });
});
