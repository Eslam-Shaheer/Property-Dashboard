import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
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
  constructor(
    private hotelService: HotelService,
    private route: ActivatedRoute,
    private shared: SharedService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.propId = params.get('id');
      this.shared.id.next(this.propId);
      console.log(this.propId);
      this.hotelService
        .getAllBookingsByHotelId(this.propId)
        .pipe(map((Data) => Data.data))
        .subscribe((result) => {
          this.latestBookings = result.slice(0, 3);
        });

      this.hotelService
        .getAllMessagesByHotelId(this.propId)
        .pipe(map((Data) => Data.data))
        .subscribe((result) => {
          for (let i = 0; i < result.length; i++) {
            if (result[i].replay.length <= 0) {
              this.unAnswerdMsgs[i] = result[i];
            }
          }
          console.log(this.unAnswerdMsgs);
        });
    });
  }
}
