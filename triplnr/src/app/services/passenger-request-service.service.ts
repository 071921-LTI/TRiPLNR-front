import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PassengerRequest } from '../models/passenger-request';

@Injectable({
  providedIn: 'root'
})
export class PassengerRequestServiceService {

  constructor(private http:HttpClient) { }

  getRequests(token:string):Observable<Array<PassengerRequest>>{
    let headers = new HttpHeaders({
      Authorization: token
    });

    return this.http.get(environment.tripURL+"myrequests", {headers}).pipe(
      map(response => response as Array<PassengerRequest>));
  }

  accept(request:PassengerRequest, token:string){
    let headers = new HttpHeaders({
      Authorization: token
    });
    return this.http.put(environment.tripURL+"accept", request, {headers}).pipe(
      map(response => response as PassengerRequest));
  }

  deny(request:PassengerRequest, token:string){
    let headers = new HttpHeaders({
      Authorization: token
    });
    return this.http.put(environment.tripURL+"deny", request, {headers}).pipe(
      map(response => response as PassengerRequest));
  }

}
