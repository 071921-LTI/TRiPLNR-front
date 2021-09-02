import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  //post login user object to back end for authorization
  login(user: User): Observable<any>{
    return this.http.post(environment.authURL+"login", user, {observe: 'response'})
    .pipe(
      map(resp => resp));
  }
  //post to pass new User object to back end
  register(user: User): Observable<any>{
    return this.http.post(environment.authURL+"register", user, {observe: 'response'})
    .pipe(
      map(resp => resp));
  }
}
