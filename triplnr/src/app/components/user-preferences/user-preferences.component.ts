import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserServiceService } from 'src/app/services/user-service.service';
@Component({
  selector: 'app-user-preferences',
  templateUrl: './user-preferences.component.html',
  styleUrls: ['./user-preferences.component.css']
})
export class UserPreferencesComponent implements OnInit {

  
  
  username?: String;
  password?: String;
  first?: String;
  last?: String;
  address? : String;

  constructor(private userService : UserServiceService) { 
        this.username = "username";
        this.password = "password";
        this.first = "firstName";
        this.last = "lastName";
        this.address = "address";
    // this.userService.getCurrentUser().subscribe(
    //   response => {
    //     this.username = response.username;
    //     this.password = response.password;
    //     this.first = response.firstName;
    //     this.last = response.lastName;
    //     this.address = response.address;
    //   }
    // )
  }

  getAddress(fullAddress : String){
    this.address = fullAddress;
  }

  
  ngOnInit(): void {
    
  }

  user?:User;
  response?: String;
  update(): void {
    this.user = {
      username: this.username,
      password: this.password,
      firstName: this.first,
      lastName: this.last,
      address: this.address
    }
    this.userService.update(this.user).subscribe(
      response => {

        this.response = response;
      }    
    )
    }
  }

