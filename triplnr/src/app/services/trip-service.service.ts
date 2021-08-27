import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Trip } from '../models/trip';


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

}
