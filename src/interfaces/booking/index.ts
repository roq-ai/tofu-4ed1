import { GuestInterface } from 'interfaces/guest';
import { HotelInterface } from 'interfaces/hotel';
import { GetQueryInterface } from 'interfaces';

export interface BookingInterface {
  id?: string;
  guest_id?: string;
  hotel_id?: string;
  start_date: any;
  end_date: any;
  created_at?: any;
  updated_at?: any;

  guest?: GuestInterface;
  hotel?: HotelInterface;
  _count?: {};
}

export interface BookingGetQueryInterface extends GetQueryInterface {
  id?: string;
  guest_id?: string;
  hotel_id?: string;
}
