/**
 * Created by asarker on 6/14/16.
 */

import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {ServiceHelper} from "./service.helper";
import {Configuration} from "./constants";
import {JwtHelper} from "angular2-jwt/angular2-jwt";


@Injectable()
export class LoginService {
  private actionUrl:string;
  private headers:Headers;
  private jwtHelper:JwtHelper = new JwtHelper();

  constructor(private _http:Http, public serviceHelper:ServiceHelper, private configuration:Configuration) {
    this.actionUrl = configuration.ServerWithApiUrl + 'login';
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  public login(usercreds:any) {
    var creds = {
      user: {
        email: usercreds.username,
        password: usercreds.password
      }
    }

    return new Promise((resolve, reject) => {
      this._http.post(this.actionUrl, JSON.stringify(creds), {headers: this.headers}).subscribe((data) => {
          if (data.ok) {
            window.localStorage.setItem('auth_key', data.json().session.api_token);
            resolve(true)
            console.log(" expiration: " + this.jwtHelper.getTokenExpirationDate(data.json().session.api_token))
          }
        },
        (err) => {
          reject(this.serviceHelper.getFormattedErrorMessage(err))
          console.log(err)
        },
        () => {
          console.log("authentication complete")
        }
      )

    })
  }
}
