import {bootstrap}    from '@angular/platform-browser-dynamic';
import {AppComponent} from './app/app.component';
import {HTTP_PROVIDERS, Http} from '@angular/http';
import {AuthConfig, AuthHttp} from "angular2-jwt/angular2-jwt";
import {provide} from "@angular/core";
import {APP_ROUTER_PROVIDERS} from "./app/app.routes";

bootstrap(AppComponent, [HTTP_PROVIDERS, APP_ROUTER_PROVIDERS,
  provide(AuthHttp, {
    useFactory: (http:any) => {
      return new AuthHttp(new AuthConfig({
        headerPrefix: '',
        tokenName: 'auth_key',
        tokenGetter: (() => window.localStorage.getItem('auth_key')), // 'window.localStorage.getItem()',
        globalHeaders: [{'Content-Type': 'application/json'}],
        noJwtError: true,
        noTokenScheme: true
      }), http);
    },
    deps: [Http]
  })]);

