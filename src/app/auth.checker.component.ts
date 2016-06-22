import {JwtHelper} from "angular2-jwt/angular2-jwt";
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot}    from '@angular/router';
import {AuthService} from "./services/auth/auth.service";
import {Injectable, Directive} from "@angular/core";

@Directive({
  selector: 'router-outlet',
  providers: [AuthService]
})

@Injectable()
export class AuthCheckerComponent implements CanActivate {
  publicRoutes:any;
  private parentRouter:Router;
  private jwtHelper:JwtHelper = new JwtHelper();

  constructor(private authService:AuthService, private router:Router) {
  }

  canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot) {

    if (window.localStorage.getItem('auth_key') != null && !this.jwtHelper.isTokenExpired(window.localStorage.getItem('auth_key'))) {
      return true;
    }


    this.router.navigate(['/login']);
    return false;
  }
}
