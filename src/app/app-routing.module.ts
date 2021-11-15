import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardHomeComponent } from './Components/dashboard-home/dashboard-home.component';
import { HomeComponent } from './Components/home/home.component';
import { InboxComponent } from './Components/inbox/inbox.component';
import { ReservationsComponent } from './Components/reservations/reservations.component';
import { ReviewsComponent } from './Components/reviews/reviews.component';

const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home/:id', component: HomeComponent },
  { path: 'inbox', component: InboxComponent },
  { path: 'bookings', component: ReservationsComponent },
  { path: 'reviews', component: ReviewsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
