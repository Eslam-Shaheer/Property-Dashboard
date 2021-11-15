import { Amenities } from './amenities';
import { HotelFacilites } from './hotel-facilites';
import { HotelRoom } from './hotel-room';
import { Message } from './message';
import { Review } from './review';

export interface Campground {
  hotelName: string;
  description?: string;
  images?: string[];
  country?: string;
  city?: string;
  streetAddress?: string;
  zipCode?: number;
  phone?: string;
  paymentOption?: number;
  children?: boolean;
  pets?: boolean;
  checkIn?: String;
  checkOut?: String;
  cancellation?: string;
  parking?: boolean;
  breakfast?: boolean;
  lunch?: boolean;
  dinner?: boolean;
  rooms?: HotelRoom;
  facilities?: HotelFacilites;
  status?: string;
  messages?: Message;
  reviews?: Review;
  amienities: Amenities;
}
