import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Auth0ServiceService } from 'src/app/services/auth0-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  constructor(private userService:UserServiceService, private router:Router, private Auth0Service: Auth0ServiceService) { }
  title :String = "profiles";
  ngOnInit(): void {
    this.token = sessionStorage.getItem("token") || '';
    this.Auth0Service.getUser().subscribe(res => {
      if (this.token != ''){
        this.userService.getProfiles(this.token).subscribe(
          response => {
            this.profiles = response;
            console.log(response);
          }
        )
      }
    })
  }

  token:string = '';
  profiles?:User[];
  searchText:string = '';
  filterUsers(){
   
  }

  openProfile(user:User){
    sessionStorage.setItem("userId", user.userId?.toString() || '');
    this.router.navigate(['/user-profile']);
  }

}
