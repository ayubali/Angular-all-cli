/**
 * Created by asarker on 6/21/16.
 */
import {provideRouter, RouterConfig} from '@angular/router';
import {ValidationComponent} from "./components/validation.component";
import {ValidationEditComponent} from "./components/validation.edit.component";
import {FormatterComponent} from "./components/formatter.component";
import {FormatterEditComponent} from "./components/formatter.edit.component";
import {HelpTextComponent} from "./components/helptext.component";
import {HelpTextEditComponent} from "./components/helptext.edit.component";
import {PanoramaCompatibilityComponent} from "./components/panoramacompatibility.component";
import {PanoramaCompatibilityEditComponent} from "./components/panoramacompatibility.edit.component";
import {ApplicationComponent} from "./components/application.component";
import {CompanyComponent} from "./components/company.component";
import {CompanyEditComponent} from "./components/company.edit.component";
import {LoginComponent} from "./components/login.component";
import {AuthCheckerComponent} from "./auth.checker.component";
import {AuthService} from "./services/auth/auth.service";
import {ApplicationEditComponent} from "./components/application.edit.component";
import {ColumnMetaDataComponent} from "./components/columnmetadata.component";
import {ColumnMetaDataEditComponent} from "./components/columnmetadata.edit.component";


export const routes:RouterConfig = [
  {path: 'login', component: LoginComponent},
  {path: '', component: LoginComponent},
  {path: 'applications', component: ApplicationComponent, canActivate: [AuthCheckerComponent]},
  {path: 'applications/:id', component: ApplicationEditComponent, canActivate: [AuthCheckerComponent]},
  {path: 'applications/new', component: ApplicationEditComponent, canActivate: [AuthCheckerComponent]},


  {path: 'companies', component: CompanyComponent, canActivate: [AuthCheckerComponent]},
  {path: 'companies/:id', component: CompanyEditComponent, canActivate: [AuthCheckerComponent]},
  {path: 'companies/new', component: CompanyEditComponent, canActivate: [AuthCheckerComponent]},

  {path: 'columnmetadata', component: ColumnMetaDataComponent, canActivate: [AuthCheckerComponent]},
  {path: 'columnmetadata/:id', component: ColumnMetaDataEditComponent, canActivate: [AuthCheckerComponent]},
  {path: 'columnmetadata/new', component: ColumnMetaDataEditComponent, canActivate: [AuthCheckerComponent]},


  {path: 'validations', component: ValidationComponent, canActivate: [AuthCheckerComponent] },
  {path: 'validations/:id', component: ValidationEditComponent, canActivate: [AuthCheckerComponent]},
  {path: 'validations/new', component: ValidationEditComponent , canActivate: [AuthCheckerComponent]},

  {path: 'formatters', component: FormatterComponent, canActivate: [AuthCheckerComponent]},
  {path: 'formatters/:id', component: FormatterEditComponent, canActivate: [AuthCheckerComponent]},
  {path: 'formatters/new', component: FormatterEditComponent, canActivate: [AuthCheckerComponent]},


  {path: 'panorama', component: PanoramaCompatibilityComponent, canActivate: [AuthCheckerComponent]},
  {path: 'panorama/:id', component: PanoramaCompatibilityEditComponent, canActivate: [AuthCheckerComponent]},
  {path: 'panorama/new', component: PanoramaCompatibilityEditComponent, canActivate: [AuthCheckerComponent]},

  {path: 'helptexts', component: HelpTextComponent, canActivate: [AuthCheckerComponent]},
  {path: 'helptexts/:id', component: HelpTextEditComponent, canActivate: [AuthCheckerComponent]},
  {path: 'helptexts/new', component: HelpTextEditComponent, canActivate: [AuthCheckerComponent]}
];


export const APP_ROUTER_PROVIDERS:any[]|AuthCheckerComponent|any[] = [
  provideRouter(routes),
  AuthCheckerComponent,
  AuthService
];
