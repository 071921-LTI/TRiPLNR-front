import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {

  constructor(private http :HttpClient) { }
  
  getCurrentWeather(address:string):Observable<any>{
    let uri = environment.weatherURL+address;
    return this.http.get<any>(uri);
  }

  getDestinationWeather(address:string, day:number):Observable<any>{
    let uri = environment.weatherURL+address+'/'+day;
    return this.http.get<any>(uri);
  }
}
