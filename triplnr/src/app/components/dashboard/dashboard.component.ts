import { Component, OnInit,Inject } from '@angular/core';
import { Trip } from 'src/app/models/trip';
import { TripServiceService } from 'src/app/services/trip-service.service';
import { Router } from '@angular/router';
import { WeatherServiceService } from 'src/app/services/weather-service.service';
import { async } from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  trips : Trip[]= [];
  token?:string;
  //list of trips sorted by time
  currentTrips : Trip[] = [];
  futureTrips : Trip[] = [];
  pastTrips : Trip[] = [];
  currentWeather:any;
  destinationWeather:any;
  txt = "";
  day:number = 1;
  constructor(private tripService: TripServiceService, private router:Router, private weather:WeatherServiceService,private modalService: NgbModal) { }

  ngOnInit(): void {
    
    //Athorization token containing `[userId]:[username]` of current user
    this.token= sessionStorage.getItem("token") || '';
    //calls getTrips method in trip-sevice.sevice
    this.tripService.getTrips(this.token).subscribe(
      async response => {this.trips = response;

      //loops through all trips and sorts into futre current and past trips list by startTime
      for(let i = 0; i< this.trips.length; i++){
        let startTime = new Date(this.trips[i].startTime!).getTime();
        let endTime = new Date(this.trips[i].endTime!).getTime();
        let timeNow = Date.now();

        if(startTime > timeNow) {
          
          this.futureTrips.push(this.trips[i]);

        }
        else if(startTime < timeNow && endTime > timeNow){

          this.currentTrips.push(this.trips[i]);
        }
        else if(endTime < timeNow){

          this.pastTrips.push(this.trips[i]);
        }

      
    }
   
    
  })
    
    }
openTrip(trip:Trip){

  sessionStorage.setItem('tripId', trip.tripId?.toString() || '');
  this.router.navigate(['/trip-dashboard']);

}

callCurrentWeather(address:any){

    this.weather.getCurrentWeather(address).subscribe(response => {
      this.currentWeather = response;
      this.txt = "";
      this.txt +="<td>" + address +"</td>";
      this.txt += "<td>" + this.currentWeather['datetime'] +"</td>";
      this.txt +="<td>" + this.currentWeather['temp'] +"</td>";
      this.txt += "<td>" + this.currentWeather['humidity'] +"</td>";
      this.txt += "<td>" + this.currentWeather['conditions'] +"</td>";
      this.txt += "</tr>"; 
      const myElement = document.getElementById('table1')!;
      myElement.innerHTML = this.txt;

    })
}

callDestWeather(address:any){

      this.weather.getDestinationWeather(address,this.day).subscribe(response => {
        this.destinationWeather = response;
        this.txt = "";
        this.txt +="<td>" + address +"</td>";
        this.txt += "<td>" + this.destinationWeather['datetime'] +"</td>";
        this.txt +="<td>" + this.destinationWeather['temp'] +"</td>";
        this.txt += "<td>" + this.destinationWeather['humidity'] +"</td>";
        this.txt += "<td>" + this.destinationWeather['conditions'] +"</td>";
        this.txt += "</tr>"; 
        const myElement = document.getElementById('table1')!;
        myElement.innerHTML = this.txt;

        })
 }

 open(content: any,address:any) {
  this.modalService.open(content,  {size:'xl',centered: true, ariaLabelledBy: 'modal-basic-title'});
  this.callCurrentWeather(address);
}

open2(content: any,address:any) {
  this.modalService.open(content,  {size:'xl',centered: true, ariaLabelledBy: 'modal-basic-title'});
  this.callDestWeather(address);
}
}


