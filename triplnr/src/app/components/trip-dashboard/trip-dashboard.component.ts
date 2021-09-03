import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip';
import { User } from 'src/app/models/user';
import { TripServiceService } from 'src/app/services/trip-service.service';
import { Router } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from 'src/environments/environment';

declare var google:any;

@Component({
  selector: 'app-trip-dashboard',
  templateUrl: './trip-dashboard.component.html',
  styleUrls: ['./trip-dashboard.component.css']
})
export class TripDashboardComponent implements OnInit {
  private map: any;
  constructor(private tripService: TripServiceService, private router:Router) {}

  

  userId?: number;
  error: String = '';

  //string to pass as header in order to create TimeStamp data type in backend
  startTimeString?: string;

  endTimeString?: string;
  //used to represent item stored in session
  token?:string;
  //represends User Model
  user?:User;
  //representd Trip Model
  trip?:Trip;

  startTime: string = '';
  endTime: string = '';

  tripManagerLast:String = '';
  tripManagerFirst:String = '';

  tripOrigin:String  = '';
  tripDestination:String = '';
  tripManager:String = '';

  tripName: String = '';
  passengers: Array<User> = [];


  addPassenger(): void{
    //User object containt one field to be filled by user
    this.user = {
      //userId of passenger to be added
      userId: this.userId
    }
    console.log(typeof this.userId)
      //check to make sure entered data is a number datatype
      if(typeof this.userId === 'number'){
        //add user object to a passenger array contating all passengers to be included in new trip object
        this.passengers.push(this.user)
        //clears input field after selection
        this.userId = undefined;
      } else { 
        //if anything other than a number is entered, clears input field
        this.userId = undefined;
      }
      
    
  }


  updateTrip(): void {
    this.token= sessionStorage.getItem("token") || '';

    this.startTime = this.startTime.replace('T', ' ') || '';
    this.startTime = this.startTime+":00";

    this.endTime = this.endTime.replace('T', ' ') || '';
    this.endTime = this.endTime+":00";

    if(this.endTime != ":00"){
      //sets startTimeString equal to formated startTime
      this.endTimeString = this.endTime;
    } else {
      this.endTimeString = this.trip?.endTime!;
    }

    if(this.startTime != ":00"){
      //sets startTimeString equal to formated startTime
      this.startTimeString = this.startTime;
    } else {
      this.startTimeString = this.trip?.startTime;
    }

    //sets fields in trip object to data entered by user
    this.trip = {
      tripId: this.trip?.tripId,
      destination: this.tripDestination,
      tripName: this.tripName,
      passengers: this.trip?.passengers,
      origin: this.tripOrigin,
    } 

    

    this.tripService.update(this.trip, this.token, this.startTimeString!, this.endTimeString).subscribe(
      response => {
        if(response != null){
          this.router.navigate(['/dashboard']);
        } else {
        this.error = "Trip Creation Error";
      }
    }
    )
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
        this.tripService.getCoords(this.tripOrigin).subscribe(
          response => {
            this.lat = response.results[0].geometry.location.lat;
            this.lng = response.results[0].geometry.location.lng;
            this.tripService.getCoords(this.tripDestination).subscribe(
              response => {
                this.latB = response.results[0].geometry.location.lat;
                this.lngB = response.results[0].geometry.location.lng;
                // console.log(this.latB);
                console.log(this.lat);
                console.log(this.lng);
        console.log(this.latB);
        console.log(this.lngB);
        var pointA = new google.maps.LatLng(this.lat, this.lng),
        pointB = new google.maps.LatLng(this.latB, this.lngB),
        // var pointA = new google.maps.LatLng(39.022895, -94.00),
        // pointB = new google.maps.LatLng(40.748558, -122.08),
        myOptions = {
          zoom: 7,
          center: pointA
        },
        map = new google.maps.Map(document.getElementById('map'), myOptions),
        // Instantiate a directions service.
        directionsService = new google.maps.DirectionsService,
        directionsDisplay = new google.maps.DirectionsRenderer({
          map: map
        }),
        markerA = new google.maps.Marker({
          position: pointA,
          title: "point A",
          label: "A",
          map: map
        }),
        markerB = new google.maps.Marker({
          position: pointB,
          title: "point B",
          label: "B",
          map: map
        });
      
        this.calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB);

              }
            );
          }
        );
        
        // setTimeout(this.getCoords, 2000);
        console.log(this.lat);
        console.log(this.latB);
      });


   }
/*
  ngOnInit(): void {
    
      (<any>window).googleMapsReady=this.initMap.bind(this);
     var script = document.createElement("script");
    script.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(script);
    script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyBF5PtKSivpcDm_7d-MBqAnkolq0MvKKxk&sensor=false&callback=googleMapsReady&libraries=geometry";
  }
*/
  // getCoords(){
  //   this.tripService.getCoords("444 Ave X Brooklyn NY 11223").subscribe(
  //     response => {
  //       this.latB = response.results[0].geometry.location.lat;
  //       this.lngB = response.results[0].geometry.location.lng;
        
  //     }
  //   );
  // }

  


  // mapsurl:String = "https://maps.googleapis.com/maps/api/js?key="+environment.mapsKey +"&callback=initMap";

  // map?: google.maps.Map;

  

  // initMap():void{
  //   const directionsService = new google.maps.DirectionsService();
  //   const directionsRenderer = new google.maps.DirectionsRenderer();
  //   this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
  //   mapTypeId: google.maps.MapTypeId.ROADMAP,
  //     center: {lat: 40.70, lng: -74.00},
  //     zoom: 8
  //   });
  //   directionsRenderer.setMap(this.map);
    
  // }
  ngAfterContentInit(){
    
  }
  ngAfterViewInit() {
    (<any>window).googleMapsReady=this.initMap.bind(this);
    var script = document.createElement("script");
   script.type = "text/javascript";
   document.getElementsByTagName("head")[0].appendChild(script);
   script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyBF5PtKSivpcDm_7d-MBqAnkolq0MvKKxk&sensor=false&callback=googleMapsReady&libraries=geometry";
 
    
    
  }
  lat?:number;
  lng?:number;
  latB?:number;
  lngB?:number;

   initMap() {
    console.log(this.lat);
    console.log(this.latB);
    
 
  
  }

   calculateAndDisplayRoute(directionsService: { route: (arg0: { origin: any; destination: any; travelMode: any; }, arg1: (response: any, status: any) => void) => void; }, directionsDisplay: { setDirections: (arg0: any) => void; }, pointA: any, pointB: any) {
    directionsService.route({
      origin: pointA,
      destination: pointB,
      travelMode: google.maps.TravelMode.DRIVING
    }, (response: any, status: string) => {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
  

}

