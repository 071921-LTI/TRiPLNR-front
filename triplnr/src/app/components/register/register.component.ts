import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { AddressFormComponent } from '../address-form/address-form.component';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService : AuthServiceService, private router:Router) {}
  
  stateArr = ['CT', 'NY', 'VT', 'TX'];

    //Create FormGroup

  toEmit = false;

  username: String = '';
  password: String = '';
  first: String = '';
  last: String = '';
  
  error:String = '';

  user?:User;

  token: String = '';

//added
  streetAddress : String = '';
  city : String = '';
  state : String = '';
  zip : String = '';

  address:String = "";
  
  isValid:boolean = true;

  
    
  //



  register(): void {
    this.address=  this.streetAddress + ", " + this.city + ", " + this.state + ", " + this.zip;
    //new user object
    this.user = {
      username: this.username,
      password: this.password,
      firstName: this.first,
      lastName: this.last,
      address: this.address
    }
    console.log(this.user);

    //calls authService register method passes through new user object
    this.authService.register(this.user).subscribe(
      (response) => {
        //sets token from header
        this.token = response.headers.get("Authorization") || '';
        if (this.token != null && this.token != ''){
        //checks token and saves token in sessoion for later use if not null or empty
        sessionStorage.setItem("token", this.token.valueOf());
        this.router.navigate(['/dashboard']);
        }
      }, error => {
        this.error = "Register Failed";
      }
    )
  }


  //added 
  onSubmit(){

  }



  ngOnInit(): void {
    sessionStorage.clear();
  }

}
