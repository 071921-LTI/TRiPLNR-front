import { Component, Inject, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT, Location } from '@angular/common';
import { Auth0ServiceService } from 'src/app/services/auth0-service.service';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(@Inject(DOCUMENT) public document: Document, private router:Router, public auth: AuthService, private auth0Service: Auth0ServiceService, location: Location) {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
          this.checkLogin();
      }

      if (event instanceof NavigationEnd) {
        this.checkLogin();
      }

      if (location.path() === '/register') {
        this.onRegister = true;
      }

  });

  }

  onRegister: boolean = false;

  ngOnInit(): void {

    this.isNotLoggedIn = true;

  }

  isNotLoggedIn:boolean = true;
  token?:string;

  clearStorage():void{
    sessionStorage.clear();
  }

  checkLogin():void{
    this.token = sessionStorage.getItem('token') || '';
    if (this.token == '' || this.token ==null){
      this.isNotLoggedIn = true;
    }else{
      this.isNotLoggedIn = false;
    }
  }
  
}
