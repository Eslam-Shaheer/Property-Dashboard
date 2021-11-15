import { Booking } from './booking';

export interface HotelRoom {
  type?: string;
  smoking?: boolean;
  roomName?: string;
  customName?: string;
  numOfRoomOfThisType?: number;
  roomSize?: number;
  price?: number;
  bedType?: string;
  bedsNumber?: number;
  guestsNumber?: number;
  available?: boolean;
  booking?: Booking[];
}
