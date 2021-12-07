import { ApartmentSettingComponent } from './Components/apartment-setting/apartment-setting.component';
import { CampgroundSettingsComponent } from './Components/campground-settings/campground-settings.component';
import { CompleteComponent } from './Components/complete/complete.component';
import { PropertySettingsComponent } from './Components/property-settings/property-settings.component';
import { UserAuthGuard } from './Components/guard/user-auth.guard';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardHomeComponent } from './Components/dashboard-home/dashboard-home.component';
import { HomeComponent } from './Components/home/home.component';

import { InboxComponent } from './Components/inbox/inbox.component';
import { ReservationsComponent } from './Components/reservations/reservations.component';
import { ReviewsComponent } from './Components/reviews/reviews.component';
import { TransactionsComponent } from './Components/transactions/transactions.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:
      '/home/' +
      localStorage.getItem('prop') +
      '/' +
      localStorage.getItem('propId'),
    pathMatch: 'full',
  },
  {
    path: 'home/:prop/:id',
    component: HomeComponent,

    canActivate: [UserAuthGuard],
  },
  {
    path: 'complete',
    component: CompleteComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: 'inbox/:prop/:id',
    component: InboxComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: 'bookings/:prop/:id',
    component: ReservationsComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: 'reviews/:prop/:id',
    component: ReviewsComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: 'settings/hotel/:id',
    component: PropertySettingsComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: 'settings/campground/:id',
    component: CampgroundSettingsComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: 'settings/apartment/:id',
    component: ApartmentSettingComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: 'transactions/:prop/:id',
    component: TransactionsComponent,
    canActivate: [UserAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
