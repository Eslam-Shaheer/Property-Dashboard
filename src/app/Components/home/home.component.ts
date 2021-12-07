import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApartmentService } from 'src/app/Services/apartment.service';
import { CampgroundService } from 'src/app/Services/campground.service';
import { HotelService } from 'src/app/Services/hotel.service';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  latestBookings: any[] = [];
  unAnswerdMsgs: any[] = [];
  propId: any;
  prop: any;
  isLoading = false;
  property: any;
  propName: any;
  constructor(
    private hotelService: HotelService,
    private route: ActivatedRoute,
    private shared: SharedService,
    private apartmentService: ApartmentService,
    private campgroundService: CampgroundService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.route.paramMap.subscribe((params) => {
      this.propId = params.get('id');
      this.prop = params.get('prop');
      this.shared.prop.next(this.prop);
      this.shared.propId.next(this.propId);
      localStorage.setItem('propId', this.propId);
      localStorage.setItem('prop', this.prop);
      console.log(this.propId, this.prop);
    });
    switch (this.prop) {
      case 'hotel':
        this.hotelService
          .getAllBookingsByHotelId(this.propId)
          .pipe(map((Data) => Data.data))
          .subscribe((result) => {
            if (result) this.latestBookings = result.slice(0, 3);
            console.log(this.latestBookings);
            this.isLoading = false;
          });

        this.hotelService
          .getAllMessagesByHotelId(this.propId)
          .pipe(map((Data) => Data.data))
          .subscribe((result) => {
            if (result) {
              for (let i = 0; i < result.length; i++) {
                if (result[i].replay.length <= 0) {
                  this.unAnswerdMsgs[i] = result[i];
                }
              }
            }
            this.isLoading = false;
          });
        this.hotelService
          .getHotelById(this.propId)
          .pipe(map((Data) => Data.data))
          .subscribe((result) => {
            this.property = result;
            this.propName = result.hotelName;
            console.log(result);
          });

        break;
      case 'apartment':
        this.apartmentService
          .getAllBookingsByApartmentId(this.propId)
          .pipe(map((Data) => Data.data))
          .subscribe((result) => {
            if (result) this.latestBookings = result.slice(0, 3);
            this.isLoading = false;
          });
        this.apartmentService
          .getAllMessagesByApartmentId(this.propId)
          .pipe(map((Data) => Data.data))
          .subscribe((result) => {
            if (result) {
              for (let i = 0; i < result.length; i++) {
                if (result[i].replay.length <= 0) {
                  this.unAnswerdMsgs[i] = result[i];
                }
              }
            }
            this.isLoading = false;
          });
        this.apartmentService
          .getApartmentbyId(this.propId)
          .pipe(map((Data) => Data.data))
          .subscribe((result) => {
            this.property = result;
            this.propName = result.apartmentName;
            console.log(this.propName);
          });
        break;
      case 'campground':
        this.campgroundService
          .getAllBookingsByCampGroundlID(this.propId)
          .pipe(map((Data) => Data.data))
          .subscribe((result) => {
            if (result) this.latestBookings = result.slice(0, 3);
            this.isLoading = false;
          });
        this.campgroundService
          .getAllMessagesByCampGroundId(this.propId)
          .pipe(map((Data) => Data.data))
          .subscribe((result) => {
            if (result) {
              for (let i = 0; i < result.length; i++) {
                if (result[i].replay.length <= 0) {
                  this.unAnswerdMsgs[i] = result[i];
                }
              }
            }
            this.isLoading = false;
          });
        this.campgroundService
          .getCampGroundById(this.propId)
          .pipe(map((Data) => Data.data))
          .subscribe((result) => {
            this.property = result;
            this.propName = result.campgroundName;
            console.log(this.propName);
          });
        break;
      default:
        return;
    }
  }
}
