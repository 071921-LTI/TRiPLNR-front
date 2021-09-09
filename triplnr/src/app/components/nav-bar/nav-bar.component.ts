import { Component, Inject, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { Auth0ServiceService } from 'src/app/services/auth0-service.service';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(@Inject(DOCUMENT) public document: Document, private router:Router, public auth: AuthService, public auth0Service: Auth0ServiceService) {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
          this.checkLogin();
      }

      if (event instanceof NavigationEnd) {
        this.checkLogin();
    }

  });

  }

  ngOnInit(): void {

    this.isNotLoggedIn = true;

    this.auth0Service.getUser().subscribe(res => {
      console.log(res)
    })
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
