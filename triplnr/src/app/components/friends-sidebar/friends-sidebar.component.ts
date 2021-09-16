import { Location } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Auth0User } from 'src/app/models/auth0User';
import { User } from 'src/app/models/user';
import { Auth0ServiceService } from 'src/app/services/auth0-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { CommonService } from 'src/app/services/common.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-friends-sidebar',
  templateUrl: './friends-sidebar.component.html',
  styleUrls: ['./friends-sidebar.component.css']
})
export class FriendsSidebarComponent implements OnInit {

  private listenForFriend: Subscription;

  constructor(private userService:UserServiceService, 
    private router:Router, 
    public auth: AuthService, 
    private auth0Service: Auth0ServiceService, 
    private commonService: CommonService, 
    public location: Location) { 

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (location.path() !== '/register' || location.path() !== '/') this.getFriends();
      }

      if (event instanceof NavigationEnd) {
        if (location.path() !== '/register' || location.path() !== '/') this.getFriends();
      }
      
    });

    this.listenForFriend= this.commonService.getFriend().subscribe
    (message => { //message contains the data sent from service
      this.getFriends();
    });

  }

  token?:string;
  friends?:Array<User>;
  isNotLoggedIn:boolean = true;
  auth0User?: Auth0User;


  getFriends(){
    this.token = sessionStorage.getItem("token") || '';
    this.auth0Service.getUser().subscribe(res => {
      this.auth0User = res;
      if (this.token != '' && this.token != null){
        this.isNotLoggedIn = false;
        this.userService.getFriends(this.token).subscribe(
          response => {
            this.friends = response;
          }
        )
        }else{
          this.isNotLoggedIn = true;
          this.friends = undefined;
        }
    });
  }

  ngOnInit(): void {
    this.isNotLoggedIn = true;
  }

  openProfile(user:User){
    sessionStorage.setItem("userId", user.userId?.toString() || '');
    if (this.location.path() !== '/user-profile') {
      this.router.navigate(['/user-profile']);
    }
  }

}
