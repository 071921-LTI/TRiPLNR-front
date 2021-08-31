import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip';
import { TripServiceService } from 'src/app/services/trip-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  trips : Trip[]= [];
  token?:string;

  constructor(private tripService: TripServiceService, private router:Router) { }

  ngOnInit(): void {
    this.token= sessionStorage.getItem("token") || '';
    console.log(this.token);
    this.tripService.getTrips(this.token).subscribe(
      (response) => (this.trips = response));
      console.log("here" + this.trips);
  }

  
  displayedColumns: string[] = ['tripName', 'origin', 'stops', 'destination', 'manager', 'passengers', 'startTime'];
  
  clickedRows = new Set<Trip>();
  
}
