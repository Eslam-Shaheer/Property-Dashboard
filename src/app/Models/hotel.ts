import { Amenities } from './amenities';
import { HotelFacilites } from './hotel-facilites';
import { HotelRoom } from './hotel-room';
import { Message } from './message';
import { Review } from './review';

export interface Hotel {
  hotelName: string;
  description?: string;
  starRating?: number;
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
  amienities: Amenities;
  messages?: Message;
  reviews?: Review;
}
