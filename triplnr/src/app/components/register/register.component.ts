import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AddressFormComponent } from '../address-form/address-form.component';
import { Router } from '@angular/router';
import { Auth0ServiceService } from 'src/app/services/auth0-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  [x: string]: any;

  constructor(private userService:UserServiceService, private router:Router, private auth0: Auth0ServiceService) { }

  
  stateArr = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];

  toEmit = false;

  sub: String = '';
  first: String = '';
  last: String = '';
  profilePic: String = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png';
  bio: String = '';
  address: String = '';

  error:String = '';

  user?:User;

  token: String = '';

  streetAddress : String = '';
  city : String = '';
  state : String = '';
  zip : String = '';

  imageFile?: File;
  imageFileUrl: any = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png';

  //
  getAddress(fullAddress : String){
    this.address = fullAddress;
  }


  register(): void {
    this.address=  this.streetAddress + ", " + this.city + ", " + this.state + ", " + this.zip;
    //new user object
    this.user = {
      sub: this.sub,
      firstName: this.first,
      lastName: this.last,
      profilePic: this.profilePic,
      bio: this.bio,
      address: this.address
    }
    //calls authService register method passes through new user object
    this.userService.createUser(this.user).subscribe(
      (response) => {
        //sets token from header
        this.token = this.sub || '';
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

  ngOnInit(): void {
    sessionStorage.clear();
    
    this.auth0.getUser().subscribe(res => {
      this.sub = res.sub;
      this.imageFileUrl = res.picture;
    })
  }

  selectImage(event: any) {
    const file = event.target.files[0];
    this.imageFile = file;
    const fileReader = new FileReader();

    fileReader.onload = () => {
      return this.imageFileUrl = fileReader.result;
    }

    fileReader.readAsDataURL(file);
  }

}
