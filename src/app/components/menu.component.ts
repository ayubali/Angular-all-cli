/**
 * Created by asarker on 6/10/16.
 */
import {Component} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';

@Component({
  selector: 'login-menu',
  templateUrl: '../app/templates/login/menu.html',
  styleUrls: ['../styles/dashboard.css'],
  directives: [ROUTER_DIRECTIVES]
})


export class MenuComponent {


  constructor(private _router:Router) {

  }

  logout() {
    window.localStorage.removeItem('auth_key');
    this._router.navigate(['/login']);
  }
}

