import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardHomeComponent } from './Components/dashboard-home/dashboard-home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatrialModule } from './matrial/matrial/matrial.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReservationsComponent } from './Components/reservations/reservations.component';
import { ReviewsComponent } from './Components/reviews/reviews.component';
import { HomeComponent } from './Components/home/home.component';
import { InboxComponent } from './Components/inbox/inbox.component';
import { HotelFormComponent } from './Components/hotel-form/hotel-form.component';
import { CampgroundFormComponent } from './Components/campground-form/campground-form.component';
import { ApartmentFormComponent } from './Components/apartment-form/apartment-form.component';
import { AddPropertyHomePageComponent } from './Components/add-property-home-page/add-property-home-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DashboardHomeComponent,
    ReservationsComponent,
    ReviewsComponent,
    HomeComponent,
    InboxComponent,
    HotelFormComponent,
    CampgroundFormComponent,
    ApartmentFormComponent,
    AddPropertyHomePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatrialModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
