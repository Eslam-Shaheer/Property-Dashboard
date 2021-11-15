import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Booking } from '../Models/booking';
import { Hotel } from '../Models/hotel';
import { HotelRoom } from '../Models/hotel-room';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from '../Models/message';
import { Review } from '../Models/review';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      authentication: localStorage.getItem('authentication') || '',
    }),
  };
  //hotel api
  getAllHotels(): Observable<any> {
    return this.http.get<any>(environment.Api + 'hotel', this.httpOptions);
  }

  getHotelById(hotelId: any): Observable<any> {
    return this.http.get<any>(
      environment.Api + 'hotel/' + hotelId,
      this.httpOptions
    );
  }

  updateHotel(hotelId: any, hotel: any): Observable<any> {
    return this.http.put<any>(
      environment.Api + 'hotel/' + hotelId,
      hotel,
      this.httpOptions
    );
  }

  deleteHotel(hotelId: any): Observable<any> {
    return this.http.delete<any>(
      environment.Api + 'hotel/' + hotelId,
      this.httpOptions
    );
  }
  creatHotel(hotel: Hotel): Observable<any> {
    return this.http.post<any>(
      environment.Api + 'hotel',
      hotel,
      this.httpOptions
    );
  }

  //room api
  getAllRoomsByHotelId(hotelId: any): Observable<any> {
    return this.http.get<any>(
      environment.Api + 'hotel/room/' + hotelId,
      this.httpOptions
    );
  }

  getRoomById(hotelId: any, roomId: any): Observable<any> {
    return this.http.get<any>(
      environment.Api + 'hotel/room/' + hotelId + '/' + roomId,
      this.httpOptions
    );
  }

  creatRoom(hotelId: any, room: HotelRoom): Observable<any> {
    return this.http.post<any>(
      environment.Api + 'hotel/room/' + hotelId,
      room,
      this.httpOptions
    );
  }

  updateRoom(hotelId: any, roomId: any, room: HotelRoom): Observable<any> {
    return this.http.put<any>(
      environment.Api + 'hotel/room/' + hotelId + '/' + roomId,
      room,
      this.httpOptions
    );
  }

  deleteRoom(hotelId: any, roomId: any): Observable<any> {
    return this.http.delete<any>(
      environment.Api + 'hotel/room/' + hotelId + '/' + roomId,
      this.httpOptions
    );
  }

  //booking api
  getAllBookingsByHotelId(hotelId: any): Observable<any> {
    return this.http.get<any>(
      environment.Api + 'hotel/booking/' + hotelId,
      this.httpOptions
    );
  }

  createBooking(hotelId: any, roomId: any, booking: Booking): Observable<any> {
    return this.http.post<any>(
      environment.Api + 'hotel/booking/' + hotelId + '/' + roomId,
      booking,
      this.httpOptions
    );
  }
  updateBooking(
    hotelId: any,
    roomId: any,
    bookingId: any,
    booking: Booking
  ): Observable<any> {
    return this.http.put<any>(
      environment.Api +
        'hotel/booking/' +
        hotelId +
        '/' +
        roomId +
        '/' +
        bookingId,
      booking,
      this.httpOptions
    );
  }

  deleteBooking(hotelId: any, roomId: any, bookingId: any): Observable<any> {
    return this.http.delete<any>(
      environment.Api +
        'hotel/booking/' +
        hotelId +
        '/' +
        roomId +
        '/' +
        bookingId,
      this.httpOptions
    );
  }

  //massegs api
  getAllMessagesByHotelId(hotelId: any): Observable<any> {
    return this.http.get<any>(
      environment.Api + 'hotel/message/' + hotelId,
      this.httpOptions
    );
  }
  createMessage(hotelId: any, message: Message): Observable<any> {
    return this.http.post<any>(
      environment.Api + 'hotel/message/' + hotelId,
      message,
      this.httpOptions
    );
  }
  deleteMessage(hotelId: any, messageId: any): Observable<any> {
    return this.http.delete<any>(
      environment.Api + 'hotel/message/' + hotelId + '/' + messageId,
      this.httpOptions
    );
  }

  updateMessage(
    hotelId: any,
    messageId: any,
    message: Message
  ): Observable<any> {
    return this.http.put<any>(
      environment.Api + 'hotel/message/' + hotelId + '/' + messageId,
      message,
      this.httpOptions
    );
  }
  createReplay(propId: any, messageId: any, replay: any): Observable<any> {
    return this.http.post<any>(
      environment.Api + 'hotel/message/replay/' + propId + '/' + messageId,
      replay,
      this.httpOptions
    );
  }

  //review api
  getAllReviewsByHotelId(hotelId: any): Observable<any> {
    return this.http.get<any>(
      environment.Api + 'hotel/review/' + hotelId,
      this.httpOptions
    );
  }
  createReview(hotelId: any, review: Review): Observable<any> {
    return this.http.post<any>(
      environment.Api + 'hotel/review/' + hotelId,
      review,
      this.httpOptions
    );
  }
  deleteReview(hotelId: any, reviewId: any): Observable<any> {
    return this.http.delete<any>(
      environment.Api + 'hotel/review/' + hotelId + '/' + reviewId,
      this.httpOptions
    );
  }
  updateReview(hotelId: any, reviewId: any, review: Review): Observable<any> {
    return this.http.put<any>(
      environment.Api + 'hotel/review/' + hotelId + '/' + reviewId,
      review,
      this.httpOptions
    );
  }
  getHotelsByUserId(): Observable<any> {
    return this.http.get<any>(
      environment.Api + 'hotel/user/',
      this.httpOptions
    );
  }
}
