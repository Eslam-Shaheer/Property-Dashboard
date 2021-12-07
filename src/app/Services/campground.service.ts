import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Amenities } from '../Models/amenities';
import { Booking } from '../Models/booking';
import { Campground } from '../Models/campground';
import { HotelRoom } from '../Models/hotel-room';
import { Message } from '../Models/message';
import { Review } from '../Models/review';

@Injectable({
  providedIn: 'root',
})
export class CampgroundService {
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      authentication: localStorage.getItem('authentication') || '',
    }),
  };

  /***********************************************/

  getAllCampGrounds(): Observable<any> {
    return this.http.get<any>(environment.Api + 'campground', this.httpOptions);
  }

  getCampGroundById(campID: any): Observable<any> {
    return this.http.get<any>(
      environment.Api + 'campground/' + campID,
      this.httpOptions
    );
  }
  getCampGroundsByUserId(): Observable<any> {
    return this.http.get<any>(
      environment.Api + 'campground/user/',
      this.httpOptions
    );
  }

  updateCampGround(campId: any, campground: any): Observable<any> {
    return this.http.put<any>(
      environment.Api + 'campground/' + campId,
      campground,
      this.httpOptions
    );
  }

  deleteCampGround(campID: any): Observable<any> {
    return this.http.delete<any>(
      environment.Api + 'campground/' + campID,
      this.httpOptions
    );
  }

  creatCampGround(camp: Campground): Observable<any> {
    return this.http.post<any>(
      environment.Api + 'campground',
      camp,
      this.httpOptions
    );
  }

  /************************ Room ******************************** */
  creatCampRoom(campID: any, campRoom: HotelRoom): Observable<any> {
    return this.http.post<any>(
      environment.Api + 'campground/room/' + campID,
      campRoom,
      this.httpOptions
    );
  }

  getCampRooms(campID: any): Observable<any> {
    return this.http.get<any>(
      environment.Api + 'campground/room/' + campID,
      this.httpOptions
    );
  }

  getCampRoomByID(campID: any, roomID: any): Observable<any> {
    return this.http.get<any>(
      environment.Api + 'campground/room/' + campID + '/' + roomID,
      this.httpOptions
    );
  }

  updateCampRoom(
    campID: any,
    roomID: any,
    campRoom: HotelRoom
  ): Observable<any> {
    return this.http.put<any>(
      environment.Api + 'campground/room/' + campID + '/' + roomID,
      campRoom,
      this.httpOptions
    );
  }
  deleteCampRoom(campID: any, roomID: any): Observable<any> {
    return this.http.delete<any>(
      environment.Api + 'campground/room/' + campID + '/' + roomID,
      this.httpOptions
    );
  }

  /**********************Booking************************************ */

  getAllBookingsByCampGroundlID(campID: any): Observable<any> {
    return this.http.get<any>(
      environment.Api + 'campground/booking/' + campID,
      this.httpOptions
    );
  }

  createBooking(campID: any, roomId: any, booking: Booking): Observable<any> {
    return this.http.post<any>(
      environment.Api + 'campground/booking/' + campID + '/' + roomId,
      booking,
      this.httpOptions
    );
  }
  updateBooking(
    campID: any,
    roomId: any,
    bookingId: any,
    booking: Booking
  ): Observable<any> {
    return this.http.put<any>(
      environment.Api +
        'campground/booking/' +
        campID +
        '/' +
        roomId +
        '/' +
        bookingId,
      booking,
      this.httpOptions
    );
  }

  deleteBooking(campID: any, roomId: any, bookingId: any): Observable<any> {
    return this.http.delete<any>(
      environment.Api +
        'campground/booking/' +
        campID +
        '/' +
        roomId +
        '/' +
        bookingId,
      this.httpOptions
    );
  }

  /*********************** Amenities ********************************** */

  /*********************** Messags ********************************** */

  getAllMessagesByCampGroundId(campID: any): Observable<any> {
    return this.http.get<any>(
      environment.Api + 'campground/message/' + campID,
      this.httpOptions
    );
  }
  createMessage(campID: any, message: Message): Observable<any> {
    return this.http.post<any>(
      environment.Api + 'campground/message/' + campID,
      message,
      this.httpOptions
    );
  }
  deleteMessage(campID: any, messageId: any): Observable<any> {
    return this.http.delete<any>(
      environment.Api + 'campground/message/' + campID + '/' + messageId,
      this.httpOptions
    );
  }

  updateMessage(
    campID: any,
    messageId: any,
    message: Message
  ): Observable<any> {
    return this.http.put<any>(
      environment.Api + 'campground/message/' + campID + '/' + messageId,
      message,
      this.httpOptions
    );
  }

  //review api
  getAllReviewsByCampId(campID: any): Observable<any> {
    return this.http.get<any>(
      environment.Api + 'campground/review/' + campID,
      this.httpOptions
    );
  }
  createReview(campID: any, review: Review): Observable<any> {
    return this.http.post<any>(
      environment.Api + 'campground/review/' + campID,
      review,
      this.httpOptions
    );
  }
  deleteReview(campID: any, reviewId: any): Observable<any> {
    return this.http.delete<any>(
      environment.Api + 'campground/review/' + campID + '/' + reviewId,
      this.httpOptions
    );
  }
  updateReview(campID: any, reviewId: any, review: Review): Observable<any> {
    return this.http.put<any>(
      environment.Api + 'campground/review/' + campID + '/' + reviewId,
      review,
      this.httpOptions
    );
  }
  createReplay(propId: any, messageId: any, replay: any): Observable<any> {
    return this.http.post<any>(
      environment.Api + 'campground/message/replay/' + propId + '/' + messageId,
      replay,
      this.httpOptions
    );
  }
}
