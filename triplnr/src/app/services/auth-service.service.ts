import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  login(user: User): Observable<String>{
    return this.http.post("http://localhost:8080/triplnr/auth/login", user).pipe(
      map(response => response as String));
  }
}
