/**
 * Created by asarker on 6/16/16.
 */

import {OnInit, Component} from "@angular/core";
import {Router, ROUTER_DIRECTIVES} from "@angular/router";
import {MenuComponent} from "./menu.component";
import {FormatterService} from "../services/formatter.service";
import {Formatter} from "../models/formatter";

@Component({
  templateUrl: '../app/templates/formatter/formatter.html',
  providers: [FormatterService],
  directives: [ROUTER_DIRECTIVES, MenuComponent]
})

export  class  FormatterComponent implements  OnInit{

    formatters:Formatter[] = [];
    messages:String[] = [];


    constructor(private _router:Router, private _service:FormatterService) {

    }

    private onEdit(formatter:Formatter) {
      this._router.navigate(['/formatters', formatter.id])
    }


    private delete(formatter: Formatter) {
      this._service.deleteFormatter(formatter.id).then(data => {
          if (data) {
            this.formatters = this.formatters.filter(format => format.id !== formatter.id);
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
      this.getFormatters();
    }

    private getFormatters() {
      this._service.getFormatters().subscribe(
        data => {
          this.formatters = data;
        },
        error => {
          this.messages = this._service._serviceHelper.getFormattedErrorMessage(error)
          console.log("failed to get formatter list")
        }
      );
    }

}
