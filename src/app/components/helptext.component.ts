/**
 * Created by asarker on 6/16/16.
 */


import {OnInit, Component} from "@angular/core";
import {Router, ROUTER_DIRECTIVES} from "@angular/router";
import {MenuComponent} from "./menu.component";
import {HelpText} from "../models/helptext";
import {HelpTextService} from "../services/helptext.service";
import {PaginationService, PaginationControlsCmp, PaginatePipe} from "ng2-pagination/index";
import {HelpTextFilter} from "../filters/helptext.filter";

@Component({
  templateUrl: '../app/templates/helptext/helptext.html',
  providers: [HelpTextService, PaginationService],
  directives: [ROUTER_DIRECTIVES, MenuComponent, PaginationControlsCmp],
  pipes: [PaginatePipe, HelpTextFilter]
})

export class HelpTextComponent implements  OnInit{

  helpTexts:HelpText[] = [];
  messages:String[] = [];


  constructor(private _router:Router, private _service:HelpTextService) {

  }

  private onEdit(helpText:HelpText) {
    this._router.navigate(['/helptexts', {id: helpText.id}])
  }


  private delete(helpText:HelpText) {
    this._service.deleteHelpText(helpText.id).then(data => {
        if (data) {
          this.helpTexts = this.helpTexts.filter(helptxt => helptxt.id !== helpText.id);
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
    this.getHelpTexts();
  }

  private getHelpTexts() {
    this._service.getHelpTexts().subscribe(
      data => {
        this.helpTexts = data;
      },
      error => {
        this.messages = this._service._serviceHelper.getFormattedErrorMessage(error)
        console.log("failed to get formatter list")
      }
    );
  }

}
