/**
 * Created by asarker on 6/15/16.
 */

import {OnInit, Component} from "@angular/core";
import {Application} from "../models/application";
import {ApplicationService} from "../services/application.service";
import {Router, ROUTER_DIRECTIVES}from "@angular/router";
import {MenuComponent} from "./menu.component";

@Component({
  templateUrl: '../app/templates/application/application.html',
  providers: [ApplicationService],
  directives: [ROUTER_DIRECTIVES, MenuComponent]
})


export class ApplicationComponent implements OnInit {

  applications:Application[] = [];
  messages:String[] = [];


  constructor(private _router:Router, private _service:ApplicationService) {

  }

  private onEdit(application:Application) {
    this._router.navigate(['/applications',  application.id])
  }


  private delete(application:Application) {
    this._service.deleteApplication(application.id).then(data => {
        if (data) {
          this.applications = this.applications.filter(app => app.id !== application.id);
        }
        else {
          this.messages.push("problem in deteting Entity");
        }
      },
      (error) => {
        this.messages = error;
        console.log('failed to update', error);
      });

  }


  ngOnInit():any {
    this.getApplications();
  }

  private getApplications() {
    this._service.getApplications().subscribe(
      data => {
        this.applications = data;
      },
      error => {
        this.messages = this._service._serviceHelper.getFormattedErrorMessage(error)
        console.log("failed to get company list")
      }
    );
  }
}
