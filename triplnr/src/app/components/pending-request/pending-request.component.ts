import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { FriendRequest } from 'src/app/models/friend-request';
import { User } from 'src/app/models/user';
import { FriendRequestServiceService } from 'src/app/services/friend-request-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-pending-request',
  templateUrl: './pending-request.component.html',
  styleUrls: ['./pending-request.component.css']
})
export class PendingRequestComponent implements OnInit {
  title:String = "PendingRequestComponent";
  constructor(private userService: UserServiceService, private requestService:FriendRequestServiceService, private router:Router) { 
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        //this.getRequests();
      }

      if (event instanceof NavigationEnd) {
        this.getRequests();
    }

  });
  }

  friend?:User;
  myFriends?:User[] = [];
  sharedFriends?:User[] = [];

  ngOnInit(): void {
  }

  requests:FriendRequest[] = [];
  token?:string;

  /*Retrieves user info of whoever sent the friend request and compares the current users friendlist to theirs,
  matches are displayed under 'shared friends'*/
  getPotentialFriend(id:any):void {
    this.userService.getUser(sessionStorage.getItem("token")!, id).subscribe(
      async response => {this.friend = response;
      this.friend = response;
      })

      this.userService.getFriends(sessionStorage.getItem("token")!).subscribe(
        async response => {this.myFriends = response;
        this.myFriends = response;
  
        this.sharedFriends = [];

        for(let i=0; i < this.myFriends.length; i++) {
          for(let j=0; j < this.friend?.friends.length; j++) {
            if (this.friend?.friends[j].userId == this.myFriends[i].userId) {
              this.sharedFriends?.push(this.myFriends[i]);
            }
          }
        }
      })
  }

  getRequests(){
    this.token = sessionStorage.getItem("token") || '';
    if (this.token != ''){
      this.requestService.getRequests(this.token || '').subscribe(
        response => {
          this.requests = response;
        }
      )
    }else{
      this.requests=[];
    }
  }

  acceptRequest(request:FriendRequest){
    this.requests.forEach((value,index)=>{
      if(value.requestId==request.requestId) this.requests.splice(index,1);
  });
    this.requestService.accept(request, this.token || '').subscribe(
      response => {
        request = response;
      }
    );
    event?.stopPropagation()
  }

  denyRequest(request:FriendRequest){
    this.requests.forEach((value,index)=>{
      if(value.requestId==request.requestId) this.requests.splice(index,1);
  });
  this.requestService.deny(request, this.token || '').subscribe(
    response => {
      request = response;
    }
  );
  event?.stopPropagation()
  }
}
