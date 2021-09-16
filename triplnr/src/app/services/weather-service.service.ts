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
    let uri = this.url+address;
    return this.http.get<any>(uri);
  }

  getDestinationWeather(address:String, day:number):Observable<any>{
    let uri = this.url+address+'/'+day;
    return this.http.get<any>(uri);
  }
}
