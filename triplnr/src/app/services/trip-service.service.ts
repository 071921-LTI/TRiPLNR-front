import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})


export class TripServiceService {

  constructor(private http: HttpClient) { }

  create(trip: Trip): Observable<String>{
    return this.http.post("http://localhost:8080/triplnr/trip/create", trip).pipe(
      map(response => response as String));
  }  

}
