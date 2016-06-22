/**
 * Created by asarker on 6/15/16.
 */

import {ApplicationService} from "../services/application.service";
import  {Component, OnInit, OnDestroy} from "@angular/core";
import {Router, ActivatedRoute}       from '@angular/router';
import {MenuComponent} from "./menu.component";
import {Application} from "../models/application";


@Component({
  templateUrl: '../app/templates/application/edit.html',
  providers: [ApplicationService],
  directives: [MenuComponent]
})
export class ApplicationEditComponent {
  headerTxt:string = 'Edit Application';
  application:Application;
  messages:String[] = [];
  private sub:any;

  constructor(private _router:Router, private _route:ActivatedRoute, private _service:ApplicationService) {
    this.application = <Application>({
      id: null,
      name: '',
      api_token: '',
    });
  }


  private onSubmit() {
    console.log("value: " + this.application.id + " company: name : " + this.application.name + "api-token: " + this.application.api_token);

    //update the company
    if (this.application.id) {
      this._service.updateApplication(this.application).then((data) => {
          if (data) {
            console.log('appilcation is updated successfuly', data);
            this._router.navigate(['/applications']);
          } else {
            this.messages.push('Failed to update try again');
          }
        },
        (error) => {
          this.messages = error;
          console.log('Failed to update', error);
        });
    }
    else { // create new company
      this._service.addApplication(this.application).then((data) => {
          if (data) {
            console.log('company is added successfuly', data);
            this._router.navigate(['/applications']);
          } else {
            this.messages.push('Failed to add try again');
          }
        },
        (error) => {
          this.messages = error;
          console.log('Failed to add', error);
        });
      console.log('add post the company: ');
    }
  }


  private onCancel() {
    this._router.navigate(['/applications']);
  }


  ngOnInit():any {
    
    this.sub = this._route.params.subscribe(params => {
      var applicationId = Number(params['id']);
      console.log("applicationId: " + applicationId);

      if (isNaN(applicationId) || applicationId == 0) {
        this.headerTxt = "Add New Application";

      } else {
        this._service.getApplication(applicationId).subscribe(
          data => {
            this.application = data;
          },
          err=> {
            console.log("error: " + err)
            this.messages = this._service._serviceHelper.getFormattedErrorMessage(err);
          },
          () => {
            console.log("Company: " + this.application.name + " api-token: " + this.application.api_token);
          }
        );
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
