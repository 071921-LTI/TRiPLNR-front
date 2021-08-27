import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Trip } from '../models/trip';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})


export class TripServiceService {

  constructor(private http: HttpClient) { }

  create(trip: Trip, token:string): Observable<String>{
    console.log("in create in service");
    let headers = new HttpHeaders({
      Authorization: token
    });
    
    //headers.set('Authorization', token);
    console.log(headers);

    return this.http.post("http://localhost:8080/triplnr/trip/create", trip, {headers}).pipe(
      map(response => response as String));
  }  
  getTrips(token: string): Observable<Trip[]>{
    console.log("in getTrips in service");
    let headers = new HttpHeaders({
      Authorization: token
    });
    console.log(headers);
    return this.http.get<Trip[]>(environment.tripURL + "dashboard", {headers}).pipe(
      map(response => response as Trip[]));
  }
  

}
