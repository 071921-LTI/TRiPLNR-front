
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Trip } from '../models/trip';
import { User } from '../models/user';
import { environment } from 'src/environments/environment'


@Injectable({
  providedIn: 'root'
})
 
export class TripServiceService {





  constructor(private http: HttpClient) { }
  
  create(trip: Trip, token:string): Observable<String>{

    let headers = new HttpHeaders({
      Authorization: token
    });
    
    //headers.set('Authorization', token);


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

