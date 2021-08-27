import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  update(user: User): Observable<String>{
    return this.http.post("http://localhost:8080/triplnr/user/update", user).pipe(
      map(response => response as String));
  }

  getCurrentUser(): Observable<User>{
    let authToken = sessionStorage.getItemItem("token");
    return this.http.get("http://localhost:8080/triplnr/user/" +  authToken.split(":")[0]).pipe(
      map(response => response as User));
  }
}
