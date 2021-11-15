import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
})
export class DashboardHomeComponent implements OnInit {
  propId: any;
  localPropid = localStorage.getItem('propId');
  constructor(
    private shared: SharedService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.shared.id.subscribe((res) => {
    //   this.propId = res;
    //   console.log(this.propId);
    // });
  }

  homeRedirect() {
    this.router.navigate(['/home/', this.localPropid]);
  }
  bookingsRedirect() {
    this.router.navigate(['/bookings/', this.localPropid]);
  }
  inboxRedirect() {
    console.log(this.propId);
    this.router.navigate(['/inbox/', this.localPropid]);
  }
  reviewsRedirect() {
    this.router.navigate(['/reviews/', this.localPropid]);
  }
}
