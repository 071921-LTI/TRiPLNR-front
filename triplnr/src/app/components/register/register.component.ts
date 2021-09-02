import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { AddressFormComponent } from '../address-form/address-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService : AuthServiceService, private router:Router) { }

  toEmit = false;

  username: String = '';
  password: String = '';
  first: String = '';
  last: String = '';
  address : String = '';

  error:String = '';

  user?:User;

  token: String = '';

  //
  getAddress(fullAddress : String){
    this.address = fullAddress;
  }


  register(): void {
    //new user object
    this.user = {
      username: this.username,
      password: this.password,
      firstName: this.first,
      lastName: this.last,
      address: this.address
    }
    //calls authService register method passes through new user object
    this.authService.register(this.user).subscribe(
      (response) => {
        //sets token from header
        this.token = response.headers.get("Authorization") || '';
        if (this.token != null && this.token != ''){
        //checks token and saves token in sessoion for later use if not null or empty
        sessionStorage.setItem("token", this.token.valueOf());
        this.router.navigate(['/dashboard']);
        }else{
          this.error = "Register error";
        }
      }
    )
  }

  ngOnInit(): void {
    sessionStorage.clear();
  }

}
