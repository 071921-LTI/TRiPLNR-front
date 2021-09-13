import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Trip } from 'src/app/models/trip';
import { User } from 'src/app/models/user';
import { TripServiceService } from 'src/app/services/trip-service.service';
import { Router } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from 'src/environments/environment';
import { } from 'google__maps';

declare var google: any;
const locationButton = document.createElement("button");
@Component({
  selector: 'app-trip-dashboard',
  templateUrl: './trip-dashboard.component.html',
  styleUrls: ['./trip-dashboard.component.css']
})
export class TripDashboardComponent implements AfterViewInit {
  private map: any;

  constructor(private tripService: TripServiceService, private router: Router) {
    /*var script = document.createElement("script");
    script.type = "text/javascript";
    document.head.appendChild(script);
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBF5PtKSivpcDm_7d-MBqAnkolq0MvKKxk";
    */
  }

  stateArr = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];
  roleArr = ['Music', 'Navigator', 'Snacks']

  userId?: number;
  error: String = '';

  //string to pass as header in order to create TimeStamp data type in backend
  startTimeString?: string;

  endTimeString?: string;
  //used to represent item stored in session
  token?: string;
  //represends User Model
  user?: User;
  //representd Trip Model
  trip?: Trip;

  startTime: string = '';
  endTime: string = '';

  tripManagerLast: String = '';
  tripManagerFirst: String = '';

  tripOrigin: String = '';
  tripDestination: String = '';
  tripManager: String = '';
  tripStop: Array<String> = [];

  tripName: String = '';
  passengers: Array<User> = [];
  isManager: boolean = true;

  // need to add functionalit to check if playlist exists and if user roles exists and change value to true
  isPlaylist: boolean = false;
  isRoles: boolean = false;
  addRoles:boolean = false;
  role:string = '';
  playlists: Array<string> = [];
  playlist: string = '';
  stops: Array<String> = [];


  originStreetAddress? : string;
  originCity? : string;
  originState? : string;
  originZip?: string;

  desStreetAddress? : string;
  desCity? : string;
  desState? : string;
  desZip?: string;
  
  currDate : string = '';
  currDateEnd: string = '';

  stopStreetAddress : String = '';
  stopCity : String = '';
  stopState : String = '';
  stopZip : String = '';

  allAddr: Array<String> = [];
  singleMap: any;
  lat?: number;
  lng?: number;
  latB?: number;
  lngB?: number;

  //CWT Vars
  googleMapsUrl: string = "https://maps.googleapis.com/maps/api/js?key=" + environment.mapsKey;
  single_Map: any;
  timeElapsed: any;
  //WayPointsMap: Map<number, String> = new Map<number, String>();
  //May need to uncomment if we're doing additional stops...

  addRolesbtn(): void{
    this.addRoles = true;
  }


  addPlaylist(): void {
    this.playlists.push(this.playlist);
    this.playlist = '';
    console.log(this.playlists);
  }

  addPassenger(): void {
    //User object containt one field to be filled by user
    this.user = {
      //userId of passenger to be added
      userId: this.userId
    }
    console.log(typeof this.userId)
    //check to make sure entered data is a number datatype
    if (typeof this.userId === 'number') {
      //add user object to a passenger array contating all passengers to be included in new trip object
      this.passengers.push(this.user)
      //clears input field after selection
      this.userId = undefined;
    } else {
      //if anything other than a number is entered, clears input field
      this.userId = undefined;
    }


  }

  removePassenger(): void {
    //User object containt one field to be filled by user
    this.user = {
      //userId of passenger to be added
      userId: this.userId
    }
    console.log(typeof this.userId)
    //check to make sure entered data is a number datatype
    if (typeof this.userId === 'number') {
      //add user object to a passenger array contating all passengers to be included in new trip object
      for (let i = 0; i < this.passengers.length; i++) {
        if (this.passengers[i].userId == this.userId) {
          this.passengers.splice(i, 1);
          break;
        }
      }
      //clears input field after selection
      this.userId = undefined;
    } else {
      //if anything other than a number is entered, clears input field
      this.userId = undefined;
    }


  }

  addStops(): void {
    this.stops.push(this.stopStreetAddress + ", " + this.stopCity + ", " + this.stopState + ", " + this.stopZip);
    console.log(this.stops);
    this.stopStreetAddress = '';
    this.stopCity = '';
    this.stopState = '';
    this.stopZip = '';
  }

  RemoveThisStop(row: any) : void {
    this.stops.splice(this.stops.indexOf(row),1);
  }

  updateTrip(): void {
    this.tripOrigin=  this.originStreetAddress + ", " + this.originCity + ", " + this.originState + ", " + this.originZip;
    this.tripStop= this.stops;
    this.tripDestination=  this.desStreetAddress + ", " + this.desCity + ", " + this.desState + ", " + this.desZip;

    this.token = sessionStorage.getItem("token") || '';

    this.startTime = this.startTime.replace('T', ' ') || '';
    this.startTime = this.startTime + ":00";

    this.endTime = this.endTime.replace('T', ' ') || '';
    this.endTime = this.endTime + ":00";

    if (this.endTime != ":00") {
      //sets startTimeString equal to formated startTime
      this.endTimeString = this.endTime;
    } else {
      this.endTimeString = this.trip?.endTime!;
    }

    if (this.startTime != ":00") {
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
      passengers: this.passengers,
      origin: this.tripOrigin,
      stops: this.tripStop
    }

    console.log(this.startTimeString);
    console.log(this.endTimeString);

    
    this.tripService.update(this.trip, this.token, this.startTimeString!, this.endTimeString).subscribe(
      response => {
        if (response != null) {
          this.router.navigate(['/dashboard']);
          
        } else {
          this.error = "Trip Creation Error";
        }
      }
    )
  }

  reset():void{
    this.tripService.getTripById(this.token!, Number(sessionStorage.getItem('tripId'))).subscribe(
      response => {
        this.trip = response;
        this.tripName = this.trip.tripName || '';
        this.tripOrigin = this.trip.origin || '';
        var splitted = response.origin?.split(",",3)
        var temp = splitted?.pop()?.split(" ");
        this.originZip = temp?.pop();
        this.originState = temp?.pop();
        this.originCity = splitted?.pop();
        this.originStreetAddress = splitted?.pop();
        this.tripDestination = this.trip.destination || '';
        var splitted = response.destination?.split(",",3)
        var temp = splitted?.pop()?.split(" ");
        this.desZip = temp?.pop();
        this.desState = temp?.pop();
        this.desCity = splitted?.pop();
        this.desStreetAddress = splitted?.pop();
        this.tripManagerFirst = this.trip.manager?.firstName || '';
        this.tripManagerLast = this.trip.manager?.lastName || '';
        this.tripManager = this.tripManagerFirst + " " + this.tripManagerLast;
      }
    )
  }

  isUserManager(): void {
    let token = sessionStorage.getItem('Authorization');
    console.log("this is my token: " + token);
    let myArr = token?.split(":") || '';
    let curUserId = parseInt(myArr[0]);
    console.log("manager Id: " + this.trip?.manager?.userId + "| loged in user id: " + curUserId)
    if (curUserId != this.trip?.manager?.userId) {
      document.getElementById('tripNameinput')?.setAttribute('readonly', 'readonly');
    }
  }

  ngAfterViewInit(): void {
    let today = new Date();
    let year=today.getFullYear().toString();
    let month=(today.getMonth()+1).toString();
    if(month.length<2){
      month = "0"+month;
    }
    let day = today.getDate().toString();
    if(day.length<2){
      day = "0"+day;
    }
    let date = year+"-"+month+"-"+day;
    let hours = today.getHours().toString();
    if(hours.length<2){
      hours = "0"+hours;
    }
    let minutes = today.getMinutes().toString();
    if(minutes.length<2){
      minutes = "0"+ minutes;
    }
    let time = hours+":"+minutes;
    
    this.currDate = date + "T" + time+":00";
  
    let hourEnd= (today.getHours()+1).toString();
    if(hourEnd.length<2){
      hourEnd = "0"+hourEnd;
    }
    let timeEnd = hourEnd+":"+minutes;
    this.currDateEnd = date + "T" + timeEnd+":00";


    //gets current user authorization token from session storage
    this.token = sessionStorage.getItem('token') || '';
    console.log(this.token);

   
    this.tripService.getTripById(this.token, Number(sessionStorage.getItem('tripId'))).subscribe(
      response => {
        this.trip = response;
        this.tripName = this.trip.tripName || '';
        this.tripOrigin = this.trip.origin || '';
        this.tripDestination = this.trip.destination || '';
        this.tripManagerFirst = this.trip.manager?.firstName || '';
        this.tripManagerLast = this.trip.manager?.lastName || '';
        this.tripManager = this.tripManagerFirst + " " + this.tripManagerLast;


        this.passengers = this.trip.passengers || '';
        this.stops = this.trip.stops || '';
        console.log(this.stops)
        let token = sessionStorage.getItem('token');
        if (token != this.trip?.manager?.sub) {
          this.isManager = false;
          document.getElementById('tripNameinput')?.setAttribute('readonly', 'readonly');
          document.getElementById('tripOrigininput')?.setAttribute('readonly', 'readonly');
          document.getElementById('tripDestinationInput')?.setAttribute('readonly', 'readonly');
        } 


        this.allAddr?.push(this.tripOrigin!);
        this.trip.passengers.forEach((pass: User) => {
          this.allAddr?.push(pass.address!);
        });
        this.stops.forEach((value) =>
          {
            console.log(value);
            this.allAddr?.push(value);
          }
        )
        

        this.allAddr?.push(this.trip.destination!);

        console.log(this.allAddr);
        


       
      });
    this.addMapsScript();
  }

  ngAfterContentInit() {

  }

  ngOnit() {

  }

  

  //CWT Map
  /*************************************
   * BASE SETUP
   **************************************/

  /*Called On Init, add the Map JS Script to the Map Component HTML, then
  start the map up.*/
  addMapsScript() {
    if (document.getElementById('JSScript') == null) {
      console.log("We do not have the JSScript yet.");
      if (!document.querySelectorAll(`[src="${this.googleMapsUrl}"]`).length) {
        document.body.appendChild //Append the following to the HTML body.
          (
            Object.assign
              (
                document.createElement('script'),//Create Script Element
                {
                  id: 'JSScript',
                  type: 'text/javascript',
                  src: this.googleMapsUrl,
                  onload: () => this.execute_Map()
                }
              )
          );
      }
      else {
        //Just In Case, if something fails, or the script is already attached to this page, just execute the map.
        this.execute_Map();
      }
    }
    else {
      this.execute_Map();
    }
  }

  /*Get the map, then add a click event listener that, when you click(Not Click&Drag) on the map, you set
    a marker.*/
  execute_Map(): void {
    //Add the Traffic Layer to the Map.
    // const trafficLayer = new google.maps.TrafficLayer();
    // trafficLayer.setMap(this.getMap());
    this.ShowRoute();
  }

  /*If needed, grab the trip by ID, then display the route on the map below.
    The route will always be formatted like so:
        Trip Manager's Address
        Every Passenger's Address(Option to assume some passengers are already with the Manager?)
        Every Stop the Trip Manager wants to make along the way(Coming soon)
        The Trip's Destination.
  */
  ShowRoute() {
    this.tripService.getTripById(this.token!, Number(sessionStorage.getItem('tripId'))).subscribe(
      response => {
        this.trip = response;
        this.tripName = this.trip.tripName || '';


        this.tripOrigin = this.trip.origin || '';

        var splitted = response.origin?.split(",",3)
        var temp = splitted?.pop()?.split(" ");
        this.originZip = temp?.pop();
        this.originState = temp?.pop();
        this.originCity = splitted?.pop();
        this.originStreetAddress = splitted?.pop();
        this.stops = this.trip.stops || '';


        this.tripDestination = this.trip.destination || '';

        var splitted = response.destination?.split(",",3)
        var temp = splitted?.pop()?.split(" ");
        this.desZip = temp?.pop();
        this.desState = temp?.pop();
        this.desCity = splitted?.pop();
        this.desStreetAddress = splitted?.pop();



        this.tripManagerFirst = this.trip.manager?.firstName || '';
        this.tripManagerLast = this.trip.manager?.lastName || '';
        this.tripManager = this.tripManagerFirst + " " + this.tripManagerLast;


    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();
    //Grab the map
    directionsRenderer.setMap(this.getMap());
    //Grab the Route Div (ID being sidebar)
    directionsRenderer.setPanel(document.getElementById("sidebar") as HTMLElement);
    
    //Add Waypoints to an array.
    const waypts: google.maps.DirectionsWaypoint[] = [];
    for (let i = 1; i < this.allAddr.length - 1; i++) {
      waypts.push({
        location: String(this.allAddr[i]),
        stopover: true,
      });
    }
    
    //Call upon Direction Services to chart a route on the map.
    directionsService
      .route({
        origin: this.allAddr[0],
        destination: this.allAddr.pop(),
        waypoints: waypts,
        travelMode: google.maps.TravelMode.DRIVING,
      }).then((response: { [x: string]: { legs: { duration: { value: any; }; }[]; }[]; }) => {
        directionsRenderer.setDirections(response);
        this.timeElapsed = response['routes'][0].legs[0].duration?.value;
      }).catch((e: string) => window.alert("Directions request failed" + e)); })
  }

  //Attempt at a "singleton" map, with the option to get a new instance of the map if it's needed.
  //(Some functions don't work with a "singleton" instance...for some reason.)
  getMap(newInstance?: boolean) {
    if (newInstance) {
      return new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat: 41.7, lng: -73.7 },
        zoom: 8
      });
    }
    else {
      if (this.single_Map == null) {
        this.single_Map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
          center: { lat: 41.7, lng: -73.7 },
          zoom: 8
        });
      }
      return this.single_Map;
    }
  }

}