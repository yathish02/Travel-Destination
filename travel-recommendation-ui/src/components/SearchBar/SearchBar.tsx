import React, { useState } from 'react';
import './SearchBar.css';
import { cityNameRegex } from '../../Utils/regex'; 
import { SearchBarProps } from '../../Models/interfaces';


const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    if (city.trim() === '') {
      alert('Search bar cannot be empty');
      return;
    }
    if (!cityNameRegex.test(city)) {
      alert('Search bar can only contain letters');
      return;
    }
    onSearch(city.trim());
  };

  return (
    <div className="search-bar">
      <input 
        type="text" 
        value={city} 
        onChange={(e) => setCity(e.target.value)} 
        placeholder="Enter city name" 
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
