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

  login(user: User): Observable<any>{
    return this.http.post(environment.authURL+"login", user, {observe: 'response'})
    .pipe(
      map(resp => resp));
  }

  register(user: User): Observable<String>{
    return this.http.post(environment.authURL+"register", user).pipe(
      map(response => response as String));
  }
}
