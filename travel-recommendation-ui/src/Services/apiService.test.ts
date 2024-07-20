import axios from 'axios';
import { getDestinations, searchDestinations } from './apiService';
import { Destination } from '../Models/interfaces';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe.skip('apiService', () => {
  const mockDestinations: Destination[] = [
    {
      id: 10,
      name: "Andaman Islands",
      description: "The Andaman Islands are known for their white sandy beaches, crystal-clear waters, and vibrant marine life, perfect for snorkeling and diving.",
      city: "Andaman",
      category: "Beach"
    },
    {
      id: 7,
      name: "Darjeeling Tea Gardens",
      description: "Darjeeling is famous for its tea gardens, where you can witness breathtaking views of the Himalayas while sipping aromatic tea.",
      city: "Darjeeling",
      category: "Mountain"
    }
  ];

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('getDestinations fetches data successfully', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: mockDestinations });

    const result = await getDestinations();

    expect(axios.post).toHaveBeenCalledWith('/destinations', {
      category: [],
      city: [],
      page: 0,
      size: 10
    });

    expect(result).toEqual(mockDestinations);
  });

  test('getDestinations handles error', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Network Error'));

    await expect(getDestinations()).rejects.toThrow('Network Error');
  });

  test('searchDestinations fetches data successfully', async () => {
    const searchCity = 'Andaman';
    mockedAxios.post.mockResolvedValueOnce({ data: [mockDestinations[0]] });

    const result = await searchDestinations(searchCity);

    expect(axios.post).toHaveBeenCalledWith('/search-destinations', {
      category: [],
      city: ['andaman'],
      page: 0,
      size: 10
    });

    expect(result).toEqual([mockDestinations[0]]);
  });

  test('searchDestinations handles error', async () => {
    const searchCity = 'Andaman';
    mockedAxios.post.mockRejectedValueOnce(new Error('Network Error'));

    await expect(searchDestinations(searchCity)).rejects.toThrow('Network Error');
  });
});
