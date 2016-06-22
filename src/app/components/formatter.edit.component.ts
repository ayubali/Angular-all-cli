/**
 * Created by asarker on 6/16/16.
 */

import  {Component, OnInit, OnDestroy} from "@angular/core";
import {Router, ActivatedRoute, ROUTER_DIRECTIVES} from "@angular/router";
import {MenuComponent} from "./menu.component";
import {Formatter} from "../models/formatter";
import {FormatterService} from "../services/formatter.service";

@Component({
  templateUrl: '../app/templates/formatter/edit.html',
  providers: [FormatterService],
  directives: [ROUTER_DIRECTIVES, MenuComponent]
})


export class FormatterEditComponent implements OnInit,  OnDestroy {

  headerTxt:string = 'Edit Formatter';
  formatter:Formatter;
  messages:String[] = [];
  private sub:any;

  constructor(private _router:Router, private _route:ActivatedRoute, private _service:FormatterService) {
    this.formatter = <Formatter>({
      id: null,
      identifier: '',
      format: ''
    });
  }

  private onSubmit() {
    console.log("value: " + this.formatter.id + " formatter: identifier : " + this.formatter.identifier + "format: " + this.formatter.format);

    //update the formatter
    if (this.formatter.id) {
      this._service.updateFormatter(this.formatter).then((data) => {
          if (data) {
            console.log('formatter is updated successfuly', data);
            this._router.navigate(['/formatters']);
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
      this._service.addFormatter(this.formatter).then((data) => {
          if (data) {
            console.log('Formatter is added successfuly', data);
            this._router.navigate(['/formatters']);
          } else {
            this.messages.push('Failed to add try again');
          }
        },
        (error) => {
          this.messages = error;
          console.log('Failed to add', error);
        });
      console.log('add post the Formatter: ');
    }
  }


  private onCancel() {
    this._router.navigate(['/formatters']);
  }

  ngOnInit():any {

    this.sub = this._route.params.subscribe(params => {
      var formatterId = Number(params['id']);
      console.log("formatterId: " + formatterId);

      if (isNaN(formatterId) || formatterId == 0) {
        this.headerTxt = "Add New Formatter";

      } else {
        this._service.getFormatter(formatterId).subscribe(
          data => {
            this.formatter = data;
          },
          err=> {
            console.log("error: " + err)
            this.messages = this._service._serviceHelper.getFormattedErrorMessage(err);
          },
          () => {
            console.log("formatter: " + this.formatter.identifier + " name: " + this.formatter.format);
          }
        );
      }
    });
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
