import { ApartmentFacilities } from './apartment-facilities';
import { BedRoom } from './bed-room';
import { Booking } from './booking';
import { LivingRoom } from './living-room';
import { Message } from './message';
import { Review } from './review';

export interface Apartment {
  apartmentName: string;
  country: string;
  city: string;
  streetName: string;
  homeNumber: number;
  apartmentNumber: number;
  bedRooms: BedRoom;
  livingRooms: LivingRoom;
  bathRooms: number;
  price: number;
  paymentOption: number;
  facilitie: ApartmentFacilities;
  checkIn: string;
  checkOut: string;
  cancellation: number;
  bookings: Booking;
  messages: Message;
  reviews: Review;
  phone: string;
  status: string;
  size: number;
  guestsNum: number;
  pets: boolean;
  children: boolean;
  events: boolean;
  smoking: boolean;
}
