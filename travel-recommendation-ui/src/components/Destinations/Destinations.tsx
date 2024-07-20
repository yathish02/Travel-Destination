import React from 'react';
import DestinationCard from '../DestinationCard/DestinationCard';
import { DestinationsProps } from '../../Models/interfaces';

const Destinations: React.FC<DestinationsProps> = ({
  destinations,
  currentPage,
  itemsPerPage,
  onNextPage,
  onPreviousPage,
  searchQuery
}) => {
  const paginatedDestinations = destinations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div className="destination-list">
        {paginatedDestinations.length > 0 ? (
          paginatedDestinations.map((dest) => (
            <DestinationCard
              key={dest.id}
              name={dest.name}
            />
          ))
        ) : (
          <p>No Destinations Found</p>
        )}
      </div>
      {searchQuery && (
        <div className="pagination">
          <button onClick={onPreviousPage} disabled={currentPage === 1}>Previous</button>
          <button onClick={onNextPage} disabled={currentPage * itemsPerPage >= destinations.length}>Next</button>
        </div>
      )}
    </div>
  );
};

export default Destinations;
