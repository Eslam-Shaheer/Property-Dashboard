import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PeriodicElement } from 'src/app/Models/periodic-element';
import { HotelService } from 'src/app/Services/hotel.service';
import { map } from 'rxjs/operators';
import { SharedService } from 'src/app/Services/shared.service';
import { ApartmentService } from 'src/app/Services/apartment.service';
import { CampgroundService } from 'src/app/Services/campground.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss'],
})
export class ReservationsComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'startAt',
    'endAt',
    'createdAt',
    'totalPrice',
    'days',
    'cancel',
  ];

  bookings: any[] = [];
  dataSource = new MatTableDataSource<PeriodicElement>(this.bookings);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  propId: any;
  prop: any;
  isLoading = false;
  constructor(
    private hotelService: HotelService,
    private shared: SharedService,
    private apartmentService: ApartmentService,
    private campgroundService: CampgroundService,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {}
  openSnackBar(bookingId: any) {
    this.shared
      .cancelFree(this.prop, this.propId, bookingId)
      .subscribe((data) => {
        this._snackBar.open('Message sucessfully sent', 'Ok');
      });
  }
  ngOnInit(): void {
    this.isLoading = true;
    this.activatedRoute.paramMap.subscribe((params) => {
      this.propId = params.get('id');
      this.prop = params.get('prop');
    });
    switch (this.prop) {
      case 'hotel':
        this.hotelService
          .getAllBookingsByHotelId(this.propId)
          .pipe(map((Data) => Data.data))
          .subscribe((result) => {
            console.log(result);
            this.dataSource.data = result;
            this.bookings = result;
            this.isLoading = false;
          });
        break;
      case 'apartment':
        this.apartmentService
          .getAllBookingsByApartmentId(this.propId)
          .pipe(map((Data) => Data.data))
          .subscribe((result) => {
            console.log(result);
            this.dataSource.data = result;
            this.bookings = result;
            this.isLoading = false;
          });
        break;
      case 'campground':
        this.campgroundService
          .getAllBookingsByCampGroundlID(this.propId)
          .pipe(map((Data) => Data.data))
          .subscribe((result) => {
            console.log(result);
            this.dataSource.data = result;
            this.bookings = result;
            this.isLoading = false;
          });
        break;
    }

    console.log(this.dataSource);
  }
}
