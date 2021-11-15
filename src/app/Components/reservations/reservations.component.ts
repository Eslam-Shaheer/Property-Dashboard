import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PeriodicElement } from 'src/app/Models/periodic-element';
import { HotelService } from 'src/app/Services/hotel.service';
import { map } from 'rxjs/operators';
import { SharedService } from 'src/app/Services/shared.service';
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
  ];

  dataSource = new MatTableDataSource<PeriodicElement>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  porpId: any;
  constructor(
    private hotelService: HotelService,
    private shared: SharedService
  ) {}

  ngOnInit(): void {
    this.shared.id.subscribe((id) => {
      this.porpId = id;
    });

    this.hotelService
      .getAllBookingsByHotelId(this.porpId)
      .pipe(map((Data) => Data.data))
      .subscribe((result) => {
        console.log(result);
        this.dataSource.data = result;
      });
    this.hotelService
      .getAllMessagesByHotelId(this.porpId)
      .pipe(map((Data) => (Data.data.replay.length = 0)));
    console.log(this.dataSource);
  }
}
