import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-friends-sidebar',
  templateUrl: './friends-sidebar.component.html',
  styleUrls: ['./friends-sidebar.component.css']
})
export class FriendsSidebarComponent implements OnInit {

  constructor(private userService:UserServiceService, private router:Router) { 

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
          this.getFriends();
      }

      if (event instanceof NavigationEnd) {
        this.getFriends();
    }
  });

  }

  token?:string;
  friends?:Array<User>;
  isNotLoggedIn:boolean = true;


  getFriends(){
    this.token = sessionStorage.getItem("token") || '';
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
  }

  ngOnInit(): void {
    this.isNotLoggedIn = true;
  }

}
