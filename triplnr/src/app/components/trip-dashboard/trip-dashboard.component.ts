import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip';
import { User } from 'src/app/models/user';
import { TripServiceService } from 'src/app/services/trip-service.service';
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from 'src/environments/environment';

declare var google:any;

@Component({
  selector: 'app-trip-dashboard',
  templateUrl: './trip-dashboard.component.html',
  styleUrls: ['./trip-dashboard.component.css']
})
export class TripDashboardComponent implements OnInit {

  constructor(private tripService: TripServiceService) {
   }

  ngOnInit(): void {
    //gets current user authorization token from session storage
    this.token = sessionStorage.getItem('Authorization') || '';
    this.tripService.getTripById(this.token, Number(sessionStorage.getItem('tripId'))).subscribe(
      response => {
        this.trip = response;
        this.tripName = this.trip.tripName || '';
        this.tripOrigin = this.trip.origin || '';
        this.tripDestination = this.trip.destination || '';
        this.tripManagerFirst = this.trip.manager?.firstName || '';
        this.tripManagerLast = this.trip.manager?.lastName || '';
        this.tripManager = this.tripManagerFirst + " " + this.tripManagerLast;
      }
    );
    
  }

  ionViewDidEnter(){
    this.initMap();
  }

  //google maps api url, including api key
  mapsurl:String = "https://maps.googleapis.com/maps/api/js?key="+environment.mapsKey +"&callback=initMap";

  map?: google.maps.Map;

  tripManagerLast:String = '';
  tripManagerFirst:String = '';
  tripName:String = '';
  tripOrigin:String  = '';
  tripDestination:String = '';
  tripManager:String = '';
  trip?:Trip;
  token?:string;

  initMap():void{
    //populates dashboard with google map privided by the api
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
  }


 

}
