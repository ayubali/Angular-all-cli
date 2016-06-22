import {AuthService} from "../services/auth/auth.service";
import {Component, OnInit}  from '@angular/core';
import {Router} from '@angular/router';
import {JwtHelper} from "angular2-jwt/angular2-jwt";
import {LoginService} from "../services/login.service";


@Component({
  templateUrl: '../app/templates/login/login.html',
  providers: [LoginService]
})

export class LoginComponent implements OnInit {

  private jwtHelper:JwtHelper = new JwtHelper();
  messages:String[] = [];
  localUser = {
    username: '',
    password: ''
  }

  constructor(private _service:LoginService, private _router:Router) {
  }

  login() {
    this._service.login(this.localUser).then((data) => {
        if (data) {
          console.log("got auth key");
          this._router.navigate(['/companies']);
        }
      },
      (error) => {
        this.messages = error;
        console.log('failed to update', error);
      });
  }

  clearfields() {
    this.localUser.username = '';
    this.localUser.password = '';
    this.messages = [];
  }

  ngOnInit():any {
    if (window.localStorage.getItem('auth_key') && !this.jwtHelper.isTokenExpired(window.localStorage.getItem('auth_key'))) {
      this._router.navigate(['/companies']);
    }
  }
}
