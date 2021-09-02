import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService : AuthServiceService, private router:Router, private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    sessionStorage.clear();
  }

    username:String = '';
    password:String = '';

    token:String = '';
    user?:User;
    error:String = '';
    isNotLoggedIn:boolean = true;
    


    login(): void{
      this.user = {
        username: this.username,
        password: this.password
      }
      this.authService.login(this.user).subscribe(
        (response) => {
          this.token = response.headers.get("Authorization") || '';
 if (this.token != null && this.token != ''){
          this.error = "";
          sessionStorage.setItem("token", this.token.valueOf());
          this.isNotLoggedIn = true;
          this.router.navigate(['/dashboard']);
          }
        }, error => {
          this.error = "Login failed";
        }
      );
      
    }


}
