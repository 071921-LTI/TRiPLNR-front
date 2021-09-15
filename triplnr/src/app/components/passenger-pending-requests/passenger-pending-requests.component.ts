import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { PassengerRequest } from 'src/app/models/passenger-request';
import { PassengerRequestServiceService } from 'src/app/services/passenger-request-service.service';
import { User } from 'src/app/models/user';

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

  passengers:User[] = [];

  //Used to make dates look not horrible
  prettyStart?:string;
  prettyEnd?:string;
  prettierDatesAndSavePass(start:any, end:any, users:User[]):void {
    let toArray =  start.split("T");
    this.prettyStart = toArray[0];

    toArray = [];

    toArray =  end.split("T");
    this.prettyEnd = toArray[0];

    this.passengers = users;
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

  acceptRequest(request:PassengerRequest){
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

  denyRequest(request:PassengerRequest){
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