import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

    username : String = '';
    showUsername : String = '';
    password : String = '';
    showPassword : String = '';


    login(): void{
      this.showUsername = this.username;
      this.showPassword = this.password;
    }


}
