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

  getAddress(fullAddress : String){
    this.address = fullAddress;
  }

  register(): void {
    this.user = {
      username: this.username,
      password: this.password,
      firstName: this.first,
      lastName: this.last,
      address: this.address
    }
    this.authService.register(this.user).subscribe(
      (response) => {
        this.token = response.headers.get("Authorization") || '';
        if (this.token != null && this.token != ''){
        sessionStorage.setItem("token", this.token.valueOf());
        this.router.navigate(['/dashboard']);
        }
      }, error => {
        this.error = "Register Failed";
      }
    )
  }

  ngOnInit(): void {
    sessionStorage.clear();
  }

}
