import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import {AuthCheckerComponent} from "./auth.checker.component";

import {Configuration} from "./services/constants";
import {ServiceHelper} from "./services/service.helper";

import {DataService} from "./services/data.service";

//import "./vendor";

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  directives: [ROUTER_DIRECTIVES],
  providers: [Configuration, ServiceHelper, DataService]
})

export class AppComponent {
}
