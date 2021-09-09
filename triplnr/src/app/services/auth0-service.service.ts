import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Auth0User } from '../models/auth0User';

@Injectable({
  providedIn: 'root'
})
export class Auth0ServiceService {

  constructor(public auth: AuthService) { }

  isAuthenticated():  Observable<boolean> {
    
    return this.auth.isAuthenticated$.pipe(map(res => res as boolean));
    
  }

  getUser(): Observable<Auth0User> {
    return this.auth.user$.pipe(map(res => res as Auth0User));
  }
}
