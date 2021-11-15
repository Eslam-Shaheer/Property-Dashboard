import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
})
export class DashboardHomeComponent implements OnInit {
  propId: any;
  constructor(private shared: SharedService, private router: Router) {}

  ngOnInit(): void {
    this.shared.id.subscribe((res) => {
      this.propId = res;
      console.log(this.propId);
    });
  }
  homeRedirect() {
    this.router.navigate(['/home/', this.propId]);
  }
  bookingsRedirect() {
    this.router.navigate(['/bookings/', this.propId]);
  }
  inboxRedirect() {
    console.log(this.propId);
    this.router.navigate(['/inbox/', this.propId]);
  }
  reviewsRedirect() {
    this.router.navigate(['/reviews/', this.propId]);
  }
}
