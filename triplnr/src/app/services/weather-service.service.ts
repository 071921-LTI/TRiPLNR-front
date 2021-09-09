import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {

  constructor(private http :HttpClient) { }

  url="http://localhost:8080/weather/";

  getCurrentWeather(address:String):Observable<any>{
    return this.http.get<any>(this.url+address);
  }

  getDestinationWeather(address:String, day:string):Observable<any>{
    // return this.http.get<any>(this.url+start+"/"+day);
    return this.http.get<any>(this.url+address+"/"+day);
  }
}
