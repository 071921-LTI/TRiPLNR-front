import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FriendRequest } from '../models/friend-request';

@Injectable({
  providedIn: 'root'
})
export class FriendRequestServiceService {

  constructor(private http:HttpClient) { }

  newRequest(request:FriendRequest, token:string): Observable<FriendRequest>{
    let headers = new HttpHeaders({
      Authorization: token
    });
    return this.http.post(environment.requestURL+"newrequest", request, {headers}).pipe(
      map(response => response as FriendRequest));
  }

  getRequests(token:string):Observable<Array<FriendRequest>>{
    let headers = new HttpHeaders({
      Authorization: token
    });

    return this.http.get(environment.requestURL+"myrequests", {headers}).pipe(
      map(response => response as Array<FriendRequest>));
  }

  accept(request:FriendRequest, token:string){
    let headers = new HttpHeaders({
      Authorization: token
    });
    return this.http.put(environment.requestURL+"accept", request, {headers}).pipe(
      map(response => response as FriendRequest));
  }

  deny(request:FriendRequest, token:string){
    let headers = new HttpHeaders({
      Authorization: token
    });
    return this.http.put(environment.requestURL+"deny", request, {headers}).pipe(
      map(response => response as FriendRequest));
  }

}
