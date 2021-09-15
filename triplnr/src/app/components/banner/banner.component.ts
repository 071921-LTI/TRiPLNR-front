import { Component, OnInit } from '@angular/core';
import { Auth0ServiceService } from 'src/app/services/auth0-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {


  constructor(private auth0Service: Auth0ServiceService, private userService: UserServiceService) { }
  imageSrc = 'https://i.imgur.com/8MwN8jI.jpg'
  //link to project logo
  imageAlt = 'logo'

  profilePic?: String;

  ngOnInit(): void {
    this.auth0Service.getUser().subscribe(res => {
      if (res) {
        this.userService.getUserBySub(res.sub).subscribe(response => {
          sessionStorage.setItem('profilePic', JSON.stringify(response));
          this.profilePic = response.profilePic;
        })
      }
    })
  }

}
