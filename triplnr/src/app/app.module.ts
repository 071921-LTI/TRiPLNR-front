import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TripDashboardComponent } from './components/trip-dashboard/trip-dashboard.component';
import { TripDashboardManagerComponent } from './components/trip-dashboard-manager/trip-dashboard-manager.component';
import { CreateTripComponent } from './components/create-trip/create-trip.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { BannerComponent } from './components/banner/banner.component';
import { FormsModule } from '@angular/forms';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { UserPreferencesComponent } from './components/user-preferences/user-preferences.component';
import { FriendsSidebarComponent } from './components/friends-sidebar/friends-sidebar.component';
import { PendingRequestComponent } from './components/pending-request/pending-request.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { FilterPipe } from './pipes/filter.pipe';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { PassengerPendingRequestsComponent } from './components/passenger-pending-requests/passenger-pending-requests.component';
import { environment } from 'src/environments/environment';
import { AuthModule } from '@auth0/auth0-angular';
import {MatDividerModule} from '@angular/material/divider';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    RegisterComponent,
    DashboardComponent,
    TripDashboardComponent,
    TripDashboardManagerComponent,
    CreateTripComponent,
    NavBarComponent,
    BannerComponent,
    AddressFormComponent,
    UserPreferencesComponent,
    FriendsSidebarComponent,
    PendingRequestComponent,
    ProfilesComponent,
    UserProfileComponent,
    FilterPipe,
    PassengerPendingRequestsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatDividerModule,
    GooglePlaceModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    LoadingBarModule,
    [NgbPaginationModule, NgbAlertModule],
    AuthModule.forRoot({
      domain: environment.AUTH_DOMAIN,
      clientId: environment.AUTH_CLIENT_ID
    })
    //MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
