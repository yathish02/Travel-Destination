import axios from 'axios';
import data from './data.json';
import { Destination } from '../Models/interfaces';

export const getDestinations = async (): Promise<Destination[]> => {
  /////// use this code when backend api /destinations is ready to call////////
  // const response = await axios.post('http://localhost:8080/destinations', {
  //   category: [],
  //   city: [],
  //   page: 0,
  //   size: 10
  // });
  // return response.data;

  return data; // dummy json
};

export const searchDestinations = async (cities: string): Promise<Destination[]> => {
  ///////// use this code when backend api /destinations is ready to call////////
  // const response = await axios.post('http://localhost:8080/destinations', {
  //   category: [],
  //   city: cities.toLowerCase().split(' '),
  //   page: 0,
  //   size: 10
  // });
  // return response.data;

  const cityList = cities.toLowerCase().split(' ');
  return data.filter((dest: Destination) =>
    cityList.some(city => dest.city.toLowerCase().includes(city))
  );
  
};
