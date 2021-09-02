import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  constructor(private userService:UserServiceService, private router:Router) { }

  ngOnInit(): void {
    this.token = sessionStorage.getItem("token") || '';
    if (this.token != ''){
      this.userService.getProfiles(this.token).subscribe(
        response => {
          this.profiles = response;
        }
      )
    }
  }

  token:string = '';
  profiles?:User[];

  openProfile(user:User){
    sessionStorage.setItem("userId", user.userId?.toString() || '');
    this.router.navigate(['/user-profile']);
  }

}
