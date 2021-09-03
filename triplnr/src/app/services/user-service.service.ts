import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }
  authToken: any = sessionStorage.getItem("token");
  
  //update users will make a http put request for the current user to the server and log the result
  update(user: User, token:string): Observable<String>{
    let headers = new HttpHeaders({
      Authorization: token
    });
    return this.http.put(environment.userURL + "update", user, {headers}).pipe(
      map(response => response as String));
  }

  //gets the currents info of the user that is logged in using a http get request
  getCurrentUser(token: string): Observable<User>{
    let headers = new HttpHeaders({
      Authorization: token
    });
    return this.http.get(environment.userURL + "user",  {headers}).pipe(
      map(response => response as User));
  }

  //gets the friends list of the user that is logged in using a http get request
  getUser(token: string, userId:number): Observable<User>{
    let headers = new HttpHeaders({
      Authorization: token
    });
    return this.http.get(environment.userURL + userId,  {headers}).pipe(
      map(response => response as User));
  }

  getFriends(token:string):Observable<User[]>{
    let headers = new HttpHeaders({
      Authorization: token
    });
    return this.http.get(environment.userURL+"myfriends", {headers}).pipe(
      map(response => response as User[])
    );
  }

  getProfiles(token:string):Observable<User[]>{
    let headers = new HttpHeaders({
      Authorization: token
    });
    return this.http.get(environment.userURL+"profiles", {headers}).pipe(
      map(response => response as User[])
    );
  }
}
