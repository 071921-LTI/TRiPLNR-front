
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

}

