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
  porpId: any;
  constructor(
    private hotelService: HotelService,
    private shared: SharedService
  ) {}
  propReviews: any[] = [];
  ngOnInit(): void {
    this.shared.id.subscribe((id) => {
      this.porpId = id;
    });
    this.hotelService
      .getAllReviewsByHotelId('618d35845f031f20b84c3ec7')
      .pipe(map((res) => res.data))
      .subscribe((result) => {
        this.propReviews = result;
        console.log(result);
      });
  }
}
