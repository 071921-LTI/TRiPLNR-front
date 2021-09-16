import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(public auth0: AuthService, public router: Router) { }
  canActivate(): Observable<boolean> {
    return this.auth0.isAuthenticated$.pipe(
      map(res => {
        if (res) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      })
    )
  }
  
}
