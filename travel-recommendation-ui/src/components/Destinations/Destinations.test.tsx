import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Destinations from './Destinations';
import { Destination } from '../../Models/interfaces';

describe('Destinations', () => {
  const mockDestinations: Destination[] = [
    {
      id: 10,
      name: 'Andaman Islands',
      description: 'The Andaman Islands are known for their white sandy beaches, crystal-clear waters, and vibrant marine life, perfect for snorkeling and diving.',
      city: 'Andaman',
      category: 'Beach',
    },
    {
      id: 7,
      name: 'Darjeeling Tea Gardens',
      description: 'Darjeeling is famous for its tea gardens, where you can witness breathtaking views of the Himalayas while sipping aromatic tea.',
      city: 'Darjeeling',
      category: 'Mountain',
    },
    {
      id: 2,
      name: 'Gateway of India',
      description: 'The Gateway of India is an arch-monument built in the early twentieth century in the city of Mumbai, India.',
      city: 'Mumbai',
      category: 'Historical',
    },
  ];

  test('renders destinations correctly', () => {
    render(
      <Destinations
        destinations={mockDestinations}
        currentPage={1}
        itemsPerPage={10}
        onNextPage={() => {}}
        onPreviousPage={() => {}}
        searchQuery=""
      />
    );

    expect(screen.getByText('Andaman Islands')).toBeInTheDocument();
    expect(screen.getByText('Darjeeling Tea Gardens')).toBeInTheDocument();
    expect(screen.getByText('Gateway of India')).toBeInTheDocument();
  });

  test('shows "No Destinations Found" when no destinations are available', () => {
    render(
      <Destinations
        destinations={[]}
        currentPage={1}
        itemsPerPage={10}
        onNextPage={() => {}}
        onPreviousPage={() => {}}
        searchQuery=""
      />
    );

    expect(screen.getByText('No Destinations Found')).toBeInTheDocument();
  });
});
