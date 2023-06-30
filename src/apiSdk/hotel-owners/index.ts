import axios from 'axios';
import queryString from 'query-string';
import { HotelOwnerInterface, HotelOwnerGetQueryInterface } from 'interfaces/hotel-owner';
import { GetQueryInterface } from '../../interfaces';

export const getHotelOwners = async (query?: HotelOwnerGetQueryInterface) => {
  const response = await axios.get(`/api/hotel-owners${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createHotelOwner = async (hotelOwner: HotelOwnerInterface) => {
  const response = await axios.post('/api/hotel-owners', hotelOwner);
  return response.data;
};

export const updateHotelOwnerById = async (id: string, hotelOwner: HotelOwnerInterface) => {
  const response = await axios.put(`/api/hotel-owners/${id}`, hotelOwner);
  return response.data;
};

export const getHotelOwnerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/hotel-owners/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteHotelOwnerById = async (id: string) => {
  const response = await axios.delete(`/api/hotel-owners/${id}`);
  return response.data;
};
