import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { HotelService } from 'src/app/Services/hotel.service';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {
  propId: any;
  constructor(
    private hotelService: HotelService,
    private shared: SharedService
  ) {}
  propReviews: any[] = [];
  ngOnInit(): void {
    this.propId = localStorage.getItem('propId');
    this.hotelService
      .getAllReviewsByHotelId(this.propId)
      .pipe(map((res) => res.data))
      .subscribe((result) => {
        this.propReviews = result;
        console.log(result);
      });
  }
}
