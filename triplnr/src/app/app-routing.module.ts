import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { RegisterComponent } from './components/register/register.component';
import { TripDashboardComponent } from './components/trip-dashboard/trip-dashboard.component';
import { CreateTripComponent } from './components/create-trip/create-trip.component';
import { UserPreferencesComponent } from './components/user-preferences/user-preferences.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { RouteGuardService } from './services/route-guard.service';
import { HomeGuardService } from './services/home-guard.service';
const routes: Routes = [{
  path:'register',
  component:RegisterComponent,
  canActivate: [RouteGuardService]
}, {
  path: '',
  component: HomepageComponent,
  canActivate: [HomeGuardService]
}, {
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [RouteGuardService]
}, {
  path: 'trip-dashboard',
  component: TripDashboardComponent,
  canActivate: [RouteGuardService]
}, {
  path: 'create-trip',
  component: CreateTripComponent,
  canActivate: [RouteGuardService]
} ,
{
  path: 'user-preferences',
  component: UserPreferencesComponent,
  canActivate: [RouteGuardService]
},
{
  path: 'profiles',
  component: ProfilesComponent,
  canActivate: [RouteGuardService]
}, {
  path: 'user-profile',
  component: UserProfileComponent,
  canActivate: [RouteGuardService]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled',})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
