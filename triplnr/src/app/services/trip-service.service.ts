
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Trip } from '../models/trip';
import { environment } from 'src/environments/environment'


@Injectable({
  providedIn: 'root'
})
 
export class TripServiceService {



  

  constructor(private http: HttpClient) { }

  getCoords(address:String):Observable<any>{
    return this.http.get("https://maps.googleapis.com/maps/api/geocode/json?&address="+address+"&key="+"AIzaSyBF5PtKSivpcDm_7d-MBqAnkolq0MvKKxk").pipe(
      map(response => response)
    );
  }
  
  //called in create-trip.component.ts
  create(trip: Trip, token:string, startTimeString:string, endTimeString:string): Observable<String>{
    
    //assign headers to pass to back end along with request body
    let headers = new HttpHeaders({
      Authorization: token,
      StartTime: startTimeString,
      EndTime: endTimeString,
    });

    //post containing url trip object and created headers
    return this.http.post(environment.tripURL+"create", trip, {headers}).pipe(
      map(response => response as String));
  }

  update(trip: Trip, token: string, startTimeString:string, endTimeString: string): Observable<String>{
    
    let headers = new HttpHeaders({
    Authorization: token,
    StartTime: startTimeString,
    EndTime: endTimeString,
    });

    return this.http.put(environment.tripURL+"update", trip, {headers}).pipe(
      map(response => response as String));
  } 
  
  //gets all trips of a specific user
  getTrips(token: string): Observable<Trip[]>{
    //assign headers
    let headers = new HttpHeaders({
      Authorization: token
    });
    //get containing url object and created headers
    return this.http.get<Trip[]>(environment.tripURL + "dashboard", {headers}).pipe(
      map(response => response as Trip[]));
  }

  // gets one specific trip by that trips listed ID
  getTripById(token: string, tripId:number): Observable<Trip>{
    //assign headers
    let headers = new HttpHeaders({
      Authorization: token
    });
    //get containing url with tripId and created headers
    return this.http.get<Trip>(environment.tripURL + tripId, {headers}).pipe(
      map(response => response as Trip));
  }

}

