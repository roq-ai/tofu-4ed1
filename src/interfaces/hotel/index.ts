import { BookingInterface } from 'interfaces/booking';
import { HotelOwnerInterface } from 'interfaces/hotel-owner';
import { GetQueryInterface } from 'interfaces';

export interface HotelInterface {
  id?: string;
  name: string;
  description?: string;
  image?: string;
  owner_id?: string;
  created_at?: any;
  updated_at?: any;
  booking?: BookingInterface[];
  hotel_owner?: HotelOwnerInterface;
  _count?: {
    booking?: number;
  };
}

export interface HotelGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  image?: string;
  owner_id?: string;
}
