import { Component, Inject, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT, Location } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  title:string="nav-bar";
  constructor(@Inject(DOCUMENT) public document: Document, private router:Router, public auth: AuthService, location: Location) {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
          this.checkLogin();
      }

      if (event instanceof NavigationEnd) {
        this.checkLogin();
      }

      if (location.path() === '/register') {
        this.onRegister = true;
      } else {
        this.onRegister = false;
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

  logout() {
    this.clearStorage();
    this.auth.logout()
  }
  
}
