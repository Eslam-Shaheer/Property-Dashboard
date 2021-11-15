import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPropertyHomePageComponent } from './Components/add-property-home-page/add-property-home-page.component';
import { ApartmentFormComponent } from './Components/apartment-form/apartment-form.component';
import { CampgroundFormComponent } from './Components/campground-form/campground-form.component';
import { DashboardHomeComponent } from './Components/dashboard-home/dashboard-home.component';
import { HomeComponent } from './Components/home/home.component';
import { HotelFormComponent } from './Components/hotel-form/hotel-form.component';
import { InboxComponent } from './Components/inbox/inbox.component';
import { ReservationsComponent } from './Components/reservations/reservations.component';
import { ReviewsComponent } from './Components/reviews/reviews.component';

const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home/:id', component: HomeComponent },
  { path: 'inbox/:id', component: InboxComponent },
  { path: 'bookings/:id', component: ReservationsComponent },
  { path: 'reviews/:id', component: ReviewsComponent },
  { path: 'add-property-home', component: AddPropertyHomePageComponent },
  { path: 'add-new-hotel', component: HotelFormComponent },
  { path: 'add-new-campground', component: CampgroundFormComponent },
  { path: 'add-new-apartment', component: ApartmentFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
