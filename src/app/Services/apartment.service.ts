import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Apartment } from '../Models/apartment';
import { BedRoom } from '../Models/bed-room';
import { Booking } from '../Models/booking';
import { LivingRoom } from '../Models/living-room';
import { Message } from '../Models/message';
import { Review } from '../Models/review';

@Injectable({
  providedIn: 'root',
})
export class ApartmentService {
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      authentication: localStorage.getItem('authentication') || '',
    }),
  };

  // Apartment Api
  getAllApartments(): Observable<any> {
    return this.http.get<any>(environment.Api + 'apartment', this.httpOptions);
  }

  getApartmentbyId(ApartmentId: any): Observable<any> {
    return this.http.get<any>(
      environment.Api + 'apartment/' + ApartmentId,
      this.httpOptions
    );
  }
  getApartmentsByUserId(): Observable<any> {
    return this.http.get<any>(
      environment.Api + 'apartment/user/',
      this.httpOptions
    );
  }

  updateApartment(ApartmentId: any, Apartment: any): Observable<any> {
    return this.http.put<any>(
      environment.Api + 'hotel/' + ApartmentId,
      Apartment,
      this.httpOptions
    );
  }

  deleteApartment(ApartmentId: any): Observable<any> {
    return this.http.delete<any>(
      environment.Api + 'apartment/' + ApartmentId,
      this.httpOptions
    );
  }
  creatApartment(ApartmentId: Apartment): Observable<any> {
    return this.http.post<any>(
      environment.Api + 'apartment',
      ApartmentId,
      this.httpOptions
    );
  }

  //bed room api

  getAllBedRoomsByApartmentId(ApartmentId: any): Observable<any> {
    return this.http.get<any>(
      environment.Api + 'apartment/bedroom/' + ApartmentId,
      this.httpOptions
    );
  }

  getBedRoomById(ApartmentId: any, roomId: BedRoom): Observable<any> {
    return this.http.get<any>(
      environment.Api + 'apartment/bedroom/' + ApartmentId + '/' + roomId,

      /*       router.get("/bedroom/:apartmentId/:roomId", apartment.displayBedRoomById);
       */
      this.httpOptions
    );
  }

  createBedRoom(ApartmentId: any, room: BedRoom): Observable<any> {
    return this.http.post<any>(
      environment.Api + 'apartment/bedroom/' + ApartmentId,
      room,
      this.httpOptions
    );
  }

  updateBedRoom(ApartmentId: any, roomId: any, room: BedRoom): Observable<any> {
    return this.http.put<any>(
      environment.Api + 'apartment/bedroom/' + ApartmentId + '/' + roomId,
      room,
      this.httpOptions
    );
  }

  deleteBedRoom(ApartmentId: any, roomId: any): Observable<any> {
    return this.http.delete<any>(
      environment.Api + 'apartment/bedroom/' + ApartmentId + '/' + roomId,
      this.httpOptions
    );
  }

  //living room api

  createLivingRoom(ApartmentId: any, room: LivingRoom): Observable<any> {
    return this.http.post<any>(
      environment.Api + 'apartment/livingroom/' + ApartmentId,
      room,
      this.httpOptions
    );
  }

  updateLivingRoom(
    ApartmentId: any,
    roomId: any,
    room: LivingRoom
  ): Observable<any> {
    return this.http.put<any>(
      environment.Api + 'apartment/livingroom/' + ApartmentId + '/' + roomId,
      room,
      this.httpOptions
    );
  }

  deleteLivingRoom(ApartmentId: any, roomId: any): Observable<any> {
    return this.http.delete<any>(
      environment.Api + 'apartment/livingroom/' + ApartmentId + '/' + roomId,
      this.httpOptions
    );
  }

  getAllLivingRoomsByApartmentId(ApartmentId: any): Observable<any> {
    return this.http.get<any>(
      environment.Api + 'apartment/livingroom/' + ApartmentId,
      this.httpOptions
    );
  }

  getLivingRoomById(ApartmentId: any, roomId: any): Observable<any> {
    return this.http.get<any>(
      environment.Api + 'apartment/livingroom/' + ApartmentId + '/' + roomId,
      this.httpOptions
    );
  }

  // /booking api
  getAllBookingsByApartmentId(ApartmentId: any): Observable<any> {
    return this.http.get<any>(
      environment.Api + 'apartment/booking/' + ApartmentId,
      this.httpOptions
    );
  }

  createBooking(ApartmentId: any, booking: Booking): Observable<any> {
    return this.http.post<any>(
      environment.Api + 'apartment/booking/' + ApartmentId,
      booking,
      this.httpOptions
    );
  }

  updateBooking(
    ApartmentId: any,
    roomId: any,
    bookingId: any,
    booking: Booking
  ): Observable<any> {
    return this.http.put<any>(
      environment.Api +
        'apartment/booking/' +
        ApartmentId +
        '/' +
        roomId +
        '/' +
        bookingId,
      booking,
      this.httpOptions
    );
  }

  deleteBooking(
    ApartmentId: any,
    roomId: any,
    bookingId: any
  ): Observable<any> {
    return this.http.delete<any>(
      environment.Api +
        'apartment/booking/' +
        ApartmentId +
        '/' +
        roomId +
        '/' +
        bookingId,
      this.httpOptions
    );
  }

  // message API

  getAllMessagesByApartmentId(ApartmentId: any): Observable<any> {
    return this.http.get<any>(
      environment.Api + 'apartment/message/' + ApartmentId,
      this.httpOptions
    );
  }

  createMessage(ApartmentId: any, message: Message): Observable<any> {
    return this.http.post<any>(
      environment.Api + 'apartment/message/' + ApartmentId,
      message,
      this.httpOptions
    );
  }

  deleteMessage(ApartmentId: any, messageId: any): Observable<any> {
    return this.http.delete<any>(
      environment.Api + 'apartment/message/' + ApartmentId + '/' + messageId,
      this.httpOptions
    );
  }

  updateMessage(
    ApartmentId: any,
    messageId: any,
    message: Message
  ): Observable<any> {
    return this.http.put<any>(
      environment.Api + 'apartment/message/' + ApartmentId + '/' + messageId,
      message,
      this.httpOptions
    );
  }

  //Review api
  getAllReviewsByApartmentId(ApartmentId: any): Observable<any> {
    return this.http.get<any>(
      environment.Api + 'apartment/review/' + ApartmentId,
      this.httpOptions
    );
  }
  createReview(ApartmentId: any, review: Review): Observable<any> {
    return this.http.post<any>(
      environment.Api + 'apartment/review/' + ApartmentId,
      review,
      this.httpOptions
    );
  }
  deleteReview(ApartmentId: any, reviewId: any): Observable<any> {
    return this.http.delete<any>(
      environment.Api + 'apartment/review/' + ApartmentId + '/' + reviewId,
      this.httpOptions
    );
  }
  updateReview(
    ApartmentId: any,
    reviewId: any,
    review: Review
  ): Observable<any> {
    return this.http.put<any>(
      environment.Api + 'apartment/review/' + ApartmentId + '/' + reviewId,
      review,
      this.httpOptions
    );
  }
}
