/**
 * Created by asarker on 6/15/16.
 */
import  {Component, OnInit, OnDestroy} from "@angular/core";
import {Router, ActivatedRoute, ROUTER_DIRECTIVES} from "@angular/router";
import {MenuComponent} from "./menu.component";
import {Validation} from "../models/validation";
import {ValidationService} from "../services/validation.service";
import {Identifier} from "../models/identifier";
import {IdentifierService} from "../services/identifier.service";

@Component({
  templateUrl: '../app/templates/validation/edit.html',
  providers: [ValidationService, IdentifierService],
  directives: [ROUTER_DIRECTIVES, MenuComponent]
})


export class ValidationEditComponent implements  OnInit, OnDestroy{
  headerTxt:string = 'Edit Validation';
  validation:Validation;
  messages:String[] = [];
  identifers:Identifier[] = [];
  private sub:any;


  constructor(private _router:Router, private _route:ActivatedRoute,  private _service:ValidationService, private _identifierService:IdentifierService) {
    this.validation = <Validation>({
      id: null,
      identifier_id: null,
      rule: '',
      identifier: {
        id: null,
        name: '',
        format: '',
        value_type: '',
        display_name: ''
      }
    });
  }

  onCancel() {
    this._router.navigate(['/validations']);
  }


  private onSubmit() {
    console.log("value: " + this.validation.id + " validation: name : " + this.validation.rule + " validation.identifier.id: " + this.validation.identifier.id + " validation.identifier.name:" + this.validation.identifier.name);

    var selectedIdentifier:Identifier = this.identifers.find(item => item.name === this.validation.identifier.name);

    console.log("selectedIdentifier : Name: " + selectedIdentifier.name + " id : " + selectedIdentifier.id);
    if (selectedIdentifier) {
      var payload = {
        id: this.validation.id,
        identifier_id: selectedIdentifier.id,
        rule: this.validation.rule
      }


      this.validation.identifier_id = selectedIdentifier.id;
      //this.validation.identifier = null;
      //update the company
      if (this.validation.id) {
        this._service.updateValidation(payload).then((data) => {
            if (data) {
              console.log('company is updated successfuly', data);
              this._router.navigate(['/validations']);
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
        this._service.addValidation(payload).then((data) => {
            if (data) {
              console.log('company is added successfuly', data);
              this._router.navigate(['/validations']);
            } else {
              this.messages.push('Failed to add try again');
            }
          },
          (error) => {
            this.messages = error;
            console.log('Failed to add', error);
          });
        console.log('added post the validation: ');
      }
    }
  }


  ngOnInit():any {
    this.getIdentifiers();

   this.sub = this._route.params.subscribe(params => {
    
      var validationId = Number(params['id']);
      console.log("validationId: " + validationId);

      if (isNaN(validationId) || validationId == 0) {
        this.headerTxt = "Add New Validation";

      } else {
        this._service.getValidation(validationId).subscribe(
          data => {
            this.validation = data;
          },
          err=> {
            console.log("error: " + err)
            this.messages = this._service._serviceHelper.getFormattedErrorMessage(err);
          },
          () => {
            console.log("value: " + this.validation.id + " validation: name : " + this.validation.rule + " validation.identifier.id: " + this.validation.identifier.id + " validation.identifier.name:" + this.validation.identifier.name);
          }
        );
      }
    });


  }

  private getIdentifiers() {
    this._identifierService.getIdentifiers().subscribe(
      data => {
        this.identifers = data;
      },
      error => {
        this.messages = this._service._serviceHelper.getFormattedErrorMessage(error)
        console.log("failed to get identifiers list")
      },
      () => {console.log("==>Identifier List is loaded")}
    );
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
