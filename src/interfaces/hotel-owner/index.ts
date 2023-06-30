import { HotelInterface } from 'interfaces/hotel';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface HotelOwnerInterface {
  id?: string;
  name: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  hotel?: HotelInterface[];
  user?: UserInterface;
  _count?: {
    hotel?: number;
  };
}

export interface HotelOwnerGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  user_id?: string;
}
