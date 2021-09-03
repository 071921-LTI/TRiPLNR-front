import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { FriendRequest } from 'src/app/models/friend-request';
import { FriendRequestServiceService } from 'src/app/services/friend-request-service.service';

@Component({
  selector: 'app-pending-request',
  templateUrl: './pending-request.component.html',
  styleUrls: ['./pending-request.component.css']
})
export class PendingRequestComponent implements OnInit {

  constructor(private requestService:FriendRequestServiceService, private router:Router) { 
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        //this.getRequests();
      }

      if (event instanceof NavigationEnd) {
        this.getRequests();
    }

  });
  }

  ngOnInit(): void {
  }

  requests:FriendRequest[] = [];
  token?:string;

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
  }


}
