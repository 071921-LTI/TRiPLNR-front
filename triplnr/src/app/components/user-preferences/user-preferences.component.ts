import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { Trip } from 'src/app/models/trip';
import { User } from 'src/app/models/user';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';

@Component({
  selector: 'app-user-preferences',
  templateUrl: './user-preferences.component.html',
  styleUrls: ['./user-preferences.component.css']
})
export class UserPreferencesComponent implements OnInit {

  stateArr = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];


  user?:User;
  response?: String;

  //token is set to the authorization token that is stored by the current session
  token = sessionStorage.getItem("token") || '';
  
  first?: String;
  last?: String;
  streetAddress ?: String ;
  city ?: String ;
  state ?: String ;
  zip ?: String ;
  address? : String;
  trips?:Trip[];
  friends?:User[];
  options = {
    types: ['address']
  } as Options;
  

  //initializes the current users information by getting the current user data from user service
  constructor(private userService : UserServiceService) { 
    this.userService.getCurrentUser(this.token).subscribe(
      response => {
        //response object containing data of current user
        this.first = response.firstName;
        this.last = response.lastName;
        this.address = response.address;
        var splitted = response.address?.split(",",3); 
        var temp = splitted?.pop()?.split(" ");
        this.zip = temp?.pop();
        this.state = temp?.pop();
        this.city = splitted?.pop();
        this.streetAddress = splitted?.pop();
        this.friends = response.friends!;
        this.trips = response.trips!;
        
      }
    )
  }

  //this directive is used to emit a formatted address to be passed in to the user object
  @Output() newAddressEvent = new EventEmitter<String>();
  @Input() toEmit = false;


  emitAddress(){
    this.address = this.streetAddress + ", " + this.city + ", " + this.state + " " + this.zip;
    this.newAddressEvent.emit(this.address);
  }

  
  ngOnInit(): void {
    
  }

  
  handleAddressChange(address: any) {
    this.address = address.formatted_address;
    var splitted = this.address!.split(","); 
    if (splitted![2].split(" ").length > 2){
      this.zip = splitted![2].split(" ")[2];
    }else{
      this.zip = "";
    }
    this.state = splitted![2].split(" ")[1];
    this.city = splitted![1].split(" ")[1];
    this.streetAddress = splitted![0];
  }

  reset(){
    this.userService.getCurrentUser(this.token).subscribe(
      response => {
        this.first = response.firstName;
        this.last = response.lastName;
        this.address = response.address;
        var splitted = response.address?.split(",",3); 
        var temp = splitted?.pop()?.split(" ");
        this.zip = temp?.pop();
        this.state = temp?.pop();
        this.city = splitted?.pop();
        this.streetAddress = splitted?.pop();
        
      }
    )
  }


//these variables will be dynamically assigned using two way databinding which implements NgModel to get form inputs from html
//sets the user info to the update values
  update(): void {
    //user new user object to replace existing object 
    this.user = {
      firstName: this.first,
      lastName: this.last,
      address: this.address,
      trips: this.trips,
      friends: this.friends
    }
    

    //calls user service to update existing user
    this.userService.update(this.user,this.token).subscribe(
      response => {
        console.log(response);
        this.response = response;
      },error => {
        console.log(error.error);
        this.response = error.error.message;
      }

    )
    }
  }
