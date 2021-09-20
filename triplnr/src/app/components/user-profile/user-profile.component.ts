import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FriendRequest } from 'src/app/models/friend-request';
import { Trip } from 'src/app/models/trip';
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
  isFriend:boolean = false;
  ngOnInit(): void {
  
    this.token = sessionStorage.getItem("token") || '';
    this.userId = Number(sessionStorage.getItem("userId")) || 0;

    this.userService.getUser(this.token, this.userId).subscribe(
      response => {
        this.userTo = response;

        response.trips.forEach((trip: any) => {
          if (new Date(trip.endTime).getTime() < Date.now()) {
            trip.arrival = new Date(trip.endTime).toLocaleDateString();
            this.pastTrips.push(trip);
          }
        })
        
        this.userService.getFriends(sessionStorage.getItem("token")!).subscribe(
          res => {
            response.friends.forEach((otherFriend: User) => {
              res.forEach(friend => {
                if (otherFriend.userId === friend.userId) {
                  this.sharedFriends.push(otherFriend);
                }
                if (friend.userId === this.userId){
                  this.isFriend = true;
                }
              })
            })
          }
        )
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
  sharedFriends: User[] = [];

  today: any = Date.now();

  pastTrips: any[] = [];


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
