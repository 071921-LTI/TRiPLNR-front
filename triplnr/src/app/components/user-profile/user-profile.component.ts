import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FriendRequest } from 'src/app/models/friend-request';
import { User } from 'src/app/models/user';
import { FriendRequestServiceService } from 'src/app/services/friend-request-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private userService:UserServiceService, private requestService:FriendRequestServiceService, private router:Router) { }
  title:String="User Profile";
  ngOnInit(): void {
  
    this.token = sessionStorage.getItem("token") || '';
    this.userId = Number(sessionStorage.getItem("userId")) || 0;
    this.userService.getUser(this.token, this.userId).subscribe(
      response => {
        this.userTo = response;
      }
    );

    this.userService.getCurrentUser(this.token).subscribe(
      response => {
        this.userFrom = response;
      }
    )
  
  }

  userFrom?:User;
  userTo?:User;
  token?:string;
  userId?:number;


  addFriend(){
    let from:User = {
      userId : this.userFrom?.userId
    }

    let to:User = {
      userId : this.userId
    }
    
    let request:FriendRequest = {
      from: from,
      to: to
    }

    this.requestService.newRequest(request, this.token || '').subscribe(
      response => {
        request = response;
      }
    );
    this.router.navigate(["/profiles"])
  }
}
