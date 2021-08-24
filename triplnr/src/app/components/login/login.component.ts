import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService : AuthServiceService) { }

  ngOnInit(): void {
  }

    username:String = '';
    password:String = '';

    user?:User;
    token:String = 'hello';


    login(): void{
      this.user =  new User(1, this.username, this.password, "first", "last");
      this.authService.login(this.user).subscribe(
        response => {
          this.token = response;
        }
      )
    }


}
