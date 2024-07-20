import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import SearchBar from '../components/SearchBar/SearchBar';
import Destinations from '../components/Destinations/Destinations';
import { getDestinations, searchDestinations } from '../Services/apiService';
import './HomePage.css';
import { Destination } from '../Models/interfaces';
import { ITEMS_PER_PAGE_SEARCH, ITEMS_PER_PAGE_DEFAULT } from '../constants';

const HomePage: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await getDestinations();
        setDestinations(data);
      } catch (err) {
        setError('Failed to fetch destinations');
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const handleSearch = async (city: string) => {
    setLoading(true);
    try {
      const data = await searchDestinations(city);
      setDestinations(data);
      setSearchQuery(city);
      setCurrentPage(1);
    } catch (err) {
      setError('Failed to fetch destinations');
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => setCurrentPage(prevPage => prevPage + 1);
  const handlePreviousPage = () => setCurrentPage(prevPage => Math.max(prevPage - 1, 1));

  const itemsPerPage = searchQuery ? ITEMS_PER_PAGE_SEARCH : ITEMS_PER_PAGE_DEFAULT;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Header />
      <SearchBar onSearch={handleSearch} />
      <Destinations
        destinations={destinations}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
        searchQuery={searchQuery}
      />
    </div>
  );
};

export default HomePage;
