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

const routes: Routes = [{
  path:'register',
  component:RegisterComponent
}, {
  path: '',
  component: HomepageComponent
}, {
  path: 'dashboard',
  component: DashboardComponent
}, {
  path: 'trip-dashboard',
  component: TripDashboardComponent
}, {
  path: 'create-trip',
  component: CreateTripComponent
} ,
{
  path: 'user-preferences',
  component: UserPreferencesComponent
},
{
  path: 'profiles',
  component: ProfilesComponent
}, {
  path: 'user-profile',
  component: UserProfileComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
