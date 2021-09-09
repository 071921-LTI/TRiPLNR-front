import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Trip } from 'src/app/models/trip';
import { User } from 'src/app/models/user';
import { TripServiceService } from 'src/app/services/trip-service.service';
import { Router } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from 'src/environments/environment';
import {} from 'google__maps';

declare var google:any;

@Component({
  selector: 'app-trip-dashboard',
  templateUrl: './trip-dashboard.component.html',
  styleUrls: ['./trip-dashboard.component.css']
})
export class TripDashboardComponent implements AfterViewInit  {
  private map: any;
  constructor(private tripService: TripServiceService, private router:Router) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    document.head.appendChild(script);
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBF5PtKSivpcDm_7d-MBqAnkolq0MvKKxk";

  }

  stateArr = ['CT', 'NY', 'VT', 'TX'];

  

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

  originStreetAddress : String = '';
  originCity : String = '';
  originState : String = '';
  originZip : String = '';

  desStreetAddress : String = '';
  desCity : String = '';
  desState : String = '';
  desZip : String = '';
  currDate : string = '';
  
  currDateEnd: string = '';

  
  

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

  removePassenger(): void{
    //User object containt one field to be filled by user
    this.user = {
      //userId of passenger to be added
      userId: this.userId
    }
    console.log(typeof this.userId)
      //check to make sure entered data is a number datatype
      if(typeof this.userId === 'number'){
        //add user object to a passenger array contating all passengers to be included in new trip object
        for (let i = 0; i < this.passengers.length; i ++){
          if (this.passengers[i].userId == this.userId){
            this.passengers.splice(i,1);
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


  updateTrip(): void {
    this.tripOrigin=  this.originStreetAddress + ", " + this.originCity + ", " + this.originState + ", " + this.originZip;
    this.tripDestination=  this.desStreetAddress + ", " + this.desCity + ", " + this.desState + ", " + this.desZip;
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
      passengers: this.passengers,
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


  isUserManager(): void {
    let token = sessionStorage.getItem('Authorization');
        console.log("this is my token: "+ token);
        let myArr = token?.split(":") || '';
        let curUserId = parseInt(myArr[0]);
        console.log("manager Id: "+this.trip?.manager?.userId + "| loged in user id: " + curUserId)
        if (curUserId != this.trip?.manager?.userId){
          document.getElementById('tripNameinput')?.setAttribute('readonly', 'readonly');
        } 
  }


  isManager:boolean = true;

  allAddr:Array<String> = [];
  singleMap:any;

  


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

    
        
    //this.isUserManager();

    
        

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


        let token = sessionStorage.getItem('token');
        console.log("this is my token: "+ token);
        let myArr = token?.split(":") || '';
        let curUserId = parseInt(myArr[0]);
        console.log("manager Id: "+this.trip?.manager?.userId + "| loged in user id: " + this.token?.split(":")[0])
        if (curUserId != this.trip?.manager?.userId){
          this.isManager = false;
          document.getElementById('tripNameinput')?.setAttribute('readonly', 'readonly');
          document.getElementById('tripOrigininput')?.setAttribute('readonly', 'readonly');
          document.getElementById('tripDestinationInput')?.setAttribute('readonly', 'readonly');
          //document.getElementById('updateBtn').style.display = "none";
        } 


        this.allAddr?.push(this.tripOrigin!);
        this.trip.passengers.forEach((pass: User) => {
          this.allAddr?.push(pass.address!);
        });
        this.allAddr?.push(this.trip.destination!);

        console.log(this.allAddr);
        //setTimeout(this.initMap, 3000);
        

        /*
        var map = new google.maps.Map(document.getElementById('map'),
        directionsService = new google.maps.DirectionsService,
        directionsDisplay = new google.maps.DirectionsRenderer({
          map: map
        })


    directionsService
      .route({
        origin: this.allAddr[0],
        destination: this.allAddr.pop(),
        waypoints: this.allAddr.slice(1),
        travelMode: google.maps.TravelMode.DRIVING,
      }).then((response: any) => {
        directionsRenderer.setDirections(response);
        console.log(response);
      });
  */

        
        /*
        this.allAddr?.forEach((addr:String) => {
          this.tripService.getCoords(addr).subscribe(
            response => {
              let lat = response.results[0].geometry.location.lat;
              let lng = response.results[0].geometry.location.lng;
              this.lat = lat;
              this.lng = lng;

              var point = new google.maps.LatLng(lat, lng);
              
              console.log(lat);
              console.log(lng);


            }
          )
        });
       */

        

        // this.tripService.getCoords(this.tripOrigin).subscribe(
        //   response => {
        //     this.lat = response.results[0].geometry.location.lat;
        //     this.lng = response.results[0].geometry.location.lng;
        //     this.tripService.getCoords(this.tripDestination).subscribe(
        //       response => {
        //         this.latB = response.results[0].geometry.location.lat;
        //         this.lngB = response.results[0].geometry.location.lng;
        //         // console.log(this.latB);
        //         console.log(this.lat);
        //         console.log(this.lng);
        // console.log(this.latB);
        // console.log(this.lngB);
        // var pointA = new google.maps.LatLng(this.lat, this.lng),
        // pointB = new google.maps.LatLng(this.latB, this.lngB),
        // // var pointA = new google.maps.LatLng(39.022895, -94.00),
        // // pointB = new google.maps.LatLng(40.748558, -122.08),
        // myOptions = {
        //   zoom: 7,
        //   center: pointA
        // },
        // map = new google.maps.Map(document.getElementById('map'), myOptions),
        // // Instantiate a directions service.
        // directionsService = new google.maps.DirectionsService,
        // directionsDisplay = new google.maps.DirectionsRenderer({
        //   map: map
        // }),
        // markerA = new google.maps.Marker({
        //   position: pointA,
        //   title: "point A",
        //   label: "A",
        //   map: map
        // }),
        // markerB = new google.maps.Marker({
        //   position: pointB,
        //   title: "point B",
        //   label: "B",
        //   map: map
        // });
      
        // this.calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB);

        //       }
        //     );
        //   }
        // );
        
        // // setTimeout(this.getCoords, 2000);
        // console.log(this.lat);
        // console.log(this.latB);

        this.initMap();
        
        

        
      });

        


        
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

  ngOnInIT():void{
    
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
  ngOnit() {

    
    
 
    
    
  }
  lat?:number;
  lng?:number;
  latB?:number;
  lngB?:number;
  

   initMap() {
    this.tripService.getTripById(this.token!, Number(sessionStorage.getItem('tripId'))).subscribe(
      response => {
        this.trip = response;
        this.tripName = this.trip.tripName || '';
        this.tripOrigin = this.trip.origin || '';
        this.tripDestination = this.trip.destination || '';
        this.tripManagerFirst = this.trip.manager?.firstName || '';
        this.tripManagerLast = this.trip.manager?.lastName || '';
        this.tripManager = this.tripManagerFirst + " " + this.tripManagerLast;
        // this.allAddr?.push(this.tripOrigin!);
        // this.trip.passengers.forEach((pass: User) => {
        //   this.allAddr?.push(pass.address!);
        // });
        // this.allAddr?.push(this.trip.destination!);
      
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 6,
      center: {
        lat: 41.85,
        lng: -87.65
      }
    });
    const waypts: google.maps.DirectionsWaypoint[] = [];
    for (let i = 1; i < this.allAddr.length - 1; i ++){
      waypts.push({
        location: String(this.allAddr[i]),
        stopover: true,
      });
    }
    console.log(waypts);
    directionsDisplay.setMap(map);
    directionsService.route({
      origin: this.allAddr[0],
      destination: this.allAddr.pop(),
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: 'DRIVING'
    }, (response:any, status:any) => {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
        var route = response.routes[0];
        // For each route, display summary information.
        
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  });
  }
  
  hello(){
    console.log("hello");
  }
/*
  calculateAndDisplayRoute(directionsService:any, directionsDisplay:any) {
    console.log("hello");
    directionsService.route({
      origin: this.allAddr[0],
      destination: this.allAddr.pop(),
      waypoints: this.allAddr.slice(1),
      optimizeWaypoints: true,
      travelMode: 'DRIVING'
    }, (response:any, status:any) => {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
        var route = response.routes[0];
        // For each route, display summary information.
        
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
*/
}

