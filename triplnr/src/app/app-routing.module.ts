import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TripDashboardComponent } from './components/trip-dashboard/trip-dashboard.component';
import { CreateTripComponent } from './components/create-trip/create-trip.component';
import { UserPreferencesComponent } from './components/user-preferences/user-preferences.component';

const routes: Routes = [{
  path:'login',
  component:LoginComponent
}, {
  path:'register',
  component:RegisterComponent
}, {
  path: '',
  component: DashboardComponent
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
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
