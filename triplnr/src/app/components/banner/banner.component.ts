import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Auth0ServiceService } from 'src/app/services/auth0-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  title:string = "banner";
  constructor(private auth0Service: Auth0ServiceService, private userService: UserServiceService, private router: Router, location: Location) {
    this.router.events.subscribe((event) => {

      if (event instanceof NavigationEnd) {
        const profilePic = sessionStorage.getItem('profilePic') || null;
        if (!profilePic) {
          this.auth0Service.getUser().subscribe(res => {
            if (res) {
              this.userService.getUserBySub(res.sub).subscribe(response => {
                sessionStorage.setItem('profilePic', `${response.profilePic}`);
                this.profilePic = response.profilePic;
              })
            }
          })
        } else {
          this.profilePic = profilePic;
        }
      }
    })
  }
  imageSrc = 'https://i.imgur.com/8MwN8jI.jpg'
  //link to project logo
  imageAlt = 'logo'

  profilePic?:string;

  ngOnInit(): void {
  }

}
