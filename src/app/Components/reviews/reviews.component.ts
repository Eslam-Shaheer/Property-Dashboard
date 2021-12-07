import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ApartmentService } from 'src/app/Services/apartment.service';
import { CampgroundService } from 'src/app/Services/campground.service';
import { HotelService } from 'src/app/Services/hotel.service';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {
  propId: any;
  prop: any;
  constructor(
    private hotelService: HotelService,
    private shared: SharedService,
    private apartmentService: ApartmentService,
    private campgroundService: CampgroundService,
    private activatedRoute: ActivatedRoute
  ) {}
  propReviews: any[] = [];
  avgReviews: number = 0;
  totalReviews: number = 0;
  isLoading = false;
  ngOnInit(): void {
    this.isLoading = true;
    this.activatedRoute.paramMap.subscribe((params) => {
      this.propId = params.get('id');
      this.prop = params.get('prop');
    });

    switch (this.prop) {
      case 'hotel':
        this.hotelService
          .getAllReviewsByHotelId(this.propId)

          .subscribe((result) => {
            this.propReviews = result.data;
            this.avgReviews = result.avgReviews;
            this.totalReviews = result.totalReviews;
            console.log(result);
            this.isLoading = false;
          });
        break;
      case 'apartment':
        this.apartmentService
          .getAllReviewsByApartmentId(this.propId)

          .subscribe((result) => {
            this.propReviews = result.data;
            this.avgReviews = result.avgReviews;
            this.totalReviews = result.totalReviews;
            this.isLoading = false;
          });
        break;
      case 'campground':
        this.campgroundService
          .getAllReviewsByCampId(this.propId)

          .subscribe((result) => {
            this.propReviews = result.data;
            this.avgReviews = result.avgReviews;
            this.totalReviews = result.totalReviews;
            this.isLoading = false;
          });
        break;
    }
  }
}
