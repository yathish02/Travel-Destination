import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders the input and button correctly', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const inputElement = screen.getByPlaceholderText('Enter city name');
    const buttonElement = screen.getByText('Search');
    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls onSearch with trimmed city name when Search button is clicked', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const inputElement = screen.getByPlaceholderText('Enter city name');
    const searchButton = screen.getByText('Search');

    fireEvent.change(inputElement, { target: { value: 'New York' } });
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith('New York');
  });

  test('displays alert when Search button is clicked with empty input', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const searchButton = screen.getByText('Search');

    fireEvent.click(searchButton);

    expect(mockOnSearch).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Search bar cannot be empty');
  });

  test('displays alert when Search button is clicked with non-letter characters', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const inputElement = screen.getByPlaceholderText('Enter city name');
    const searchButton = screen.getByText('Search');

    fireEvent.change(inputElement, { target: { value: '123' } });
    fireEvent.click(searchButton);

    expect(mockOnSearch).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Search bar can only contain letters');
  });
});
