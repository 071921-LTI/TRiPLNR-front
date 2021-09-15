import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { PassengerRequest } from 'src/app/models/passenger-request';
import { PassengerRequestServiceService } from 'src/app/services/passenger-request-service.service';

@Component({
  selector: 'app-passenger-pending-requests',
  templateUrl: './passenger-pending-requests.component.html',
  styleUrls: ['./passenger-pending-requests.component.css']
})
export class PassengerPendingRequestsComponent implements OnInit {
  title:String= "PassengerPendingRequestsComponent";
  constructor(private requestService:PassengerRequestServiceService, private router:Router) { 
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

  requests:PassengerRequest[] = [];
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

  acceptRequest(request:PassengerRequest){
    this.requests.forEach((value,index)=>{
      if(value.requestId==request.requestId) this.requests.splice(index,1);
  });
    this.requestService.accept(request, this.token || '').subscribe(
      response => {
        request = response;
      }
    );
  }

  denyRequest(request:PassengerRequest){
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