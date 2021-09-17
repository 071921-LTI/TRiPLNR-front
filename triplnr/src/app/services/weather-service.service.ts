import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {

  constructor(private http :HttpClient) { }
  
  getCurrentWeather(address:String):Observable<any>{
    let uri = environment.weatherURL+address;
    return this.http.get<any>(uri);
  }

  getDestinationWeather(address:String, day:number):Observable<any>{
    // return this.http.get<any>(this.url+start+"/"+day);
    let uri = environment.weatherURL+address+'/'+day;
    return this.http.get<any>(uri);
  }
}
