import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Trip } from '../models/trip';

let token = sessionStorage.getItem("token");
console.log("token");

let header = new HttpHeaders();
if(token != null){
  header.set('Authorization', token)
}

@Injectable({
  providedIn: 'root'
})
 
export class TripServiceService {

  constructor(private http: HttpClient, private headers: HttpHeaders) { }
  
  create(trip: Trip): Observable<String>{
    return this.http.post("http://localhost:8080/triplnr/trip/create", trip, {
      headers: header}).pipe(
      map(response => response as String));
  }  

}
