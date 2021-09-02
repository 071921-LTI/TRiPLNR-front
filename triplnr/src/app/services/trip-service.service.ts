
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
  
  create(trip: Trip, token:string, startTimeString:string): Observable<String>{

    let headers = new HttpHeaders({
      Authorization: token,
      StartTime: startTimeString,
    });


    return this.http.post(environment.tripURL+"create", trip, {headers}).pipe(
      map(response => response as String));
  }
  
  getTrips(token: string): Observable<Trip[]>{

    let headers = new HttpHeaders({
      Authorization: token
    });

    return this.http.get<Trip[]>(environment.tripURL + "dashboard", {headers}).pipe(
      map(response => response as Trip[]));
  }

  getTripById(token: string, tripId:number): Observable<Trip>{

    let headers = new HttpHeaders({
      Authorization: token
    });

    return this.http.get<Trip>(environment.tripURL + tripId, {headers}).pipe(
      map(response => response as Trip));
  }

}

