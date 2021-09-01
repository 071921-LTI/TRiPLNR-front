import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
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
//import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
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
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    //MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
