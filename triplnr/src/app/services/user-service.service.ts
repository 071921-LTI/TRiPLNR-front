import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }
  // authToken: any = sessionStorage.getItem("token");
    authToken: String = "1:user"

  update(user: User): Observable<String>{
    
    return this.http.put(environment.userURL + "update/"  +  this.authToken.split(":")[0], user).pipe(
      map(response => response as String));
  }

  getCurrentUser(): Observable<User>{
    return this.http.get(environment.userURL +  this.authToken.split(":")[0]).pipe(
      map(response => response as User));
  }
}
