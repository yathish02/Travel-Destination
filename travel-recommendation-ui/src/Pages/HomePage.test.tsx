import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from './HomePage';
import { getDestinations, searchDestinations } from '../Services/apiService';

jest.mock('../Services/apiService');

describe('HomePage', () => {
  const mockDestinations: any[] = [
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
    }
  ];

  beforeEach(() => {
    (getDestinations as jest.Mock).mockResolvedValue(mockDestinations);
  });

  test('renders loading state initially', async () => {
    render(<HomePage />);

    // Check that the loading state is present initially
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    // Wait for destinations to load
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
  });

  test('renders destinations after data fetch', async () => {
    render(<HomePage />);

    // Wait for the data to be fetched and the destinations to be displayed
    await waitFor(() => {
      expect(screen.getByText('Andaman Islands')).toBeInTheDocument();
      expect(screen.getByText('Darjeeling Tea Gardens')).toBeInTheDocument();
      expect(screen.getByText('Gateway of India')).toBeInTheDocument();
    });
  });

  test.only('handles search correctly', async () => {
    render(<HomePage />);

    // Wait for the initial load
    await waitFor(() => {
      expect(screen.getByText('Andaman Islands')).toBeInTheDocument();
      expect(screen.getByText('Darjeeling Tea Gardens')).toBeInTheDocument();
      expect(screen.getByText('Gateway of India')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Enter city name');
    const searchButton = screen.getByText('Search');

    fireEvent.change(searchInput, { target: { value: 'Mumbai' } });
    fireEvent.click(searchButton);

    (searchDestinations as jest.Mock).mockResolvedValueOnce([
      {
        id: 2,
        name: 'Gateway of India',
        description: 'The Gateway of India is an arch-monument built in the early twentieth century in the city of Mumbai, India.',
        city: 'Mumbai',
        category: 'Historical',
      },
    ]);

    await waitFor(() => {
      expect(screen.getByText('Gateway of India')).toBeInTheDocument();
    });
  });

  test('displays error message on failed data fetch', async () => {
    (getDestinations as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch destinations'));

    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch destinations')).toBeInTheDocument();
    });
  });

  test('does not display loading or error messages when data is successfully fetched', async () => {
    render(<HomePage />);

    // Ensure loading and error messages are present during fetch
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for the data fetch to complete
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      expect(screen.queryByText('Failed to fetch destinations')).not.toBeInTheDocument();
      expect(screen.getByText('Andaman Islands')).toBeInTheDocument();
      expect(screen.getByText('Darjeeling Tea Gardens')).toBeInTheDocument();
    });
  });
});
