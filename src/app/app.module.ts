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

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PropertySettingsComponent } from './Components/property-settings/property-settings.component';
import { CompleteComponent } from './Components/complete/complete.component';
import { ApartmentSettingComponent } from './Components/apartment-setting/apartment-setting.component';
import { CampgroundSettingsComponent } from './Components/campground-settings/campground-settings.component';
import { FooterComponent } from './Components/footer/footer.component';
import { TransactionsComponent } from './Components/transactions/transactions.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardHomeComponent,
    ReservationsComponent,
    ReviewsComponent,
    HomeComponent,
    InboxComponent,
    PropertySettingsComponent,
    CompleteComponent,
    ApartmentSettingComponent,
    CampgroundSettingsComponent,
    FooterComponent,
    TransactionsComponent,
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
