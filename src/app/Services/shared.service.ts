import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  propId = new Subject();
  prop = new Subject();
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      authentication: localStorage.getItem('authentication') || '',
    }),
  };
  cancelFree(property: any, propertyId: any, bookingId: any): Observable<any> {
    return this.http.get<any>(
      environment.Api +
        property +
        '/booking/cancel/' +
        propertyId +
        '/' +
        bookingId,

      this.httpOptions
    );
  }
  withdrawRequest(
    property: any,
    propertyId: any,
    paypal: any
  ): Observable<any> {
    return this.http.post<any>(
      environment.Api + 'transactions/withdraw/' + property + '/' + propertyId,
      paypal,
      this.httpOptions
    );
  }
  constructor(private http: HttpClient) {}
}
