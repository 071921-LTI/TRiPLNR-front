import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeGuardService implements CanActivate {

  constructor(public auth0: AuthService, public router: Router) { }
  canActivate(): Observable<boolean> {
    return this.auth0.isAuthenticated$.pipe(
      map(res => {
        if (res) {
          this.router.navigate(['/dashboard']);
          return false;
        } else {
          return true;
        }
      })
    )
  }
  
}