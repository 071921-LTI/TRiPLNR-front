import { NgModule, Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { TripServiceService } from 'src/app/services/trip-service.service';
import { Trip } from 'src/app/models/trip'
import { User } from 'src/app/models/user';
import { Auth0ServiceService } from 'src/app/services/auth0-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.css']
})
export class CreateTripComponent implements OnInit {

  constructor(private userService: UserServiceService, private router:Router, private tripService: TripServiceService, ) { }

  stateArr = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];

  //fields needed to pass into new trip model
  destination: String = '';
  tripName: String = '';

  //Used for the tables in the new passenger management system
  friends: User[]= [];
  passengerDeck: Array<User> = [];
  passengers: Array<User> = [];
  
  spotify:string='';

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

  //field recvied via trip-start-time input 
  startTime: string = '';
  endTime: string = '';

  streetAddress : String = '';
  city : String = '';
  state : String = '';
  zip : String = '';
  currDate:string = '';
  currDateEnd:string = '';

  //Adds passenger to 'Current Passengers' table of the passanger management system  and removes them from the 'Friends' table
  addPassengerToDeck (pass:User): void {
    this.passengerDeck.push(pass)
    console.log('Added ', pass)
    console.log(this.passengerDeck)
    const index: number = this.friends.indexOf(pass);
    this.friends.splice(index, 1); 
  }

  //Adds passenger to 'Friends' table of the passanger management system and removes them from the 'Current Passanger' table
  removePassengerFromDeck (pass:User): void {
    this.friends.push(pass)
    console.log('Added ', pass)
    console.log(this.friends)
    const index: number = this.passengerDeck.indexOf(pass);
    this.passengerDeck.splice(index, 1);
    console.log('Removed ', pass)
  }

  //Adds passengers from the 'Current Passengers' table of the passanger management system to the passenger list of the trip
  addPassengers(): void{
    this.passengers = [];
    this.passengers.push.apply(this.passengers, this.passengerDeck);
  }
 

  createTrip(): void {
    this.destination=  this.streetAddress + ", " + this.city + ", " + this.state + ", " + this.zip;
    //item stored in session when loged in contains ([userID]:[username]) of current user
    this.token= sessionStorage.getItem("token") || '';

    //takes data from user input and formats it into an acceptable string to pass into a Timestamp in backend
    this.startTime = this.startTime.replace('T', ' ') || '';
    this.startTime = this.startTime+":00";

    this.endTime = this.endTime.replace('T', ' ') || '';
    this.endTime = this.endTime+":00";

    if(this.endTime != ":00"){
      //sets startTimeString equal to formated startTime
      this.endTimeString = this.endTime;
    } else {
      this.endTimeString = '0000-00-00 00:00:00';
    }

    if(this.startTime != ":00"){
      //sets startTimeString equal to formated startTime
      this.startTimeString = this.startTime;
    } else {
      this.startTimeString = '0000-00-00 00:00:00';
    }
    
    //sets fields in trip object to data entered by user
    this.trip = {
      destination: this.destination,
      tripName: this.tripName,
      passengers: this.passengers,
      spotify: this.spotify,
    } 

    //calls trip service create, passes in new trip object with user entered fields, Authorization token and the start time string
    this.tripService.create(this.trip, this.token, this.startTimeString, this.endTimeString).subscribe(
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
    let timeEnd = hours+":"+minutes;
    this.currDateEnd = date + "T" + time+":00";

    this.userService.getFriends(sessionStorage.getItem("token")!).subscribe(
      async response => {this.friends = response;})
  }
}
