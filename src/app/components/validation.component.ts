/**
 * Created by asarker on 6/15/16.
 */

import {OnInit, Component} from "@angular/core";
import {Router, ROUTER_DIRECTIVES} from "@angular/router";
import {MenuComponent} from "./menu.component";
import {ValidationService} from "../services/validation.service";
import {Validation} from "../models/validation";

@Component({
  templateUrl: '../app/templates/validation/validation.html',
  providers: [ValidationService],
  directives: [ROUTER_DIRECTIVES, MenuComponent]
})


export class ValidationComponent implements OnInit {

  validations:Validation[] = [];
  messages:String[] = [];


  constructor(private _router:Router, private _service:ValidationService) {

  }

  private onEdit(validation:Validation) {
    this._router.navigate(['/validations', validation.id])
  }

  private delete(validation:Validation) {
    this._service.deleteValidation(validation.id).then(data => {
        if (data) {
          this.validations = this.validations.filter(validator => validator.id !== validation.id);
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
    this.getValidations();
  }

  private getValidations() {
    this._service.getValidations().subscribe(
      data => {
        this.validations = data;
      },
      error => {
        this.messages = this._service._serviceHelper.getFormattedErrorMessage(error)
        console.log("failed to get company list")
      }
    );
  }
}
