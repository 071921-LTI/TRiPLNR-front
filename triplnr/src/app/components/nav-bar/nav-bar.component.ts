import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private router:Router) {

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
