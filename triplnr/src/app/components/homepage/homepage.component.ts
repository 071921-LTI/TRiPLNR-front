import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth0ServiceService } from 'src/app/services/auth0-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private auth0: Auth0ServiceService, private router: Router, private userService: UserServiceService) { }

  ngOnInit(): void {
    this.auth0.getUser().subscribe(res => {
      if (res) {
        this.userService.getUserBySub(res.sub).subscribe(result => {
          if (result) {
            this.router.navigate(['/dashboard'])
            sessionStorage.setItem('token', result.sub?.valueOf()!);
          } else {
            this.router.navigate(['/register'])
          }
        })
      }
    })
  }

}
