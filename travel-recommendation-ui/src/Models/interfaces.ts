export interface Destination {
  id: number;
  name: string;
  description: string;
  city: string;
  category: string;
}

export interface SearchBarProps {
    onSearch: (city: string) => void;
}

export interface DestinationCardProps {
  name: string;
}

export interface DestinationsProps {
  destinations: Destination[];
  currentPage: number;
  itemsPerPage: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
  searchQuery: string;
}
  