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
  }

    username:String = '';
    password:String = '';

    token?:String;
    user?:User;
    error:String = '';



    login(): void{
      this.user = {
        username: this.username,
        password: this.password
      }
      this.authService.login(this.user).subscribe(
        response => {
          this.token = response;
 if (this.token != null){
          sessionStorage.setItem("token", this.token.valueOf());
          this.router.navigate(['/dashboard']);
          }else{
            this.error = "Login error";
            this.changeDetector.detectChanges();
          }
        }
      )
    }


}
