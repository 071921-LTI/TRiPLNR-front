import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserServiceService } from 'src/app/services/user-service.service';
@Component({
  selector: 'app-user-preferences',
  templateUrl: './user-preferences.component.html',
  styleUrls: ['./user-preferences.component.css']
})
export class UserPreferencesComponent implements OnInit {


  user?:User;
  response?: String;

  //gets token item from storage
  token = sessionStorage.getItem("token") || '';
  
  username?: String;
  password?: String;
  first?: String;
  last?: String;
  streetAddress ?: String ;
  city ?: String ;
  state ?: String ;
  zip ?: String ;
  address? : String;

  constructor(private userService : UserServiceService) { 
    this.userService.getCurrentUser(this.token).subscribe(
      response => {
        //response object containing data of current user
        this.username = response.username;
        this.password = response.password;
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

  @Output() newAddressEvent = new EventEmitter<String>();
  @Input() toEmit = false;


  emitAddress(){
    this.address = this.streetAddress + ", " + this.city + ", " + this.state + " " + this.zip;
    this.newAddressEvent.emit(this.address);
  }

  
  ngOnInit(): void {
    
  }


  update(): void {
    //user new user object to replace existing object 
    this.user = {
      username: this.username,
      password: this.password,
      firstName: this.first,
      lastName: this.last,
      address: this.address
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
