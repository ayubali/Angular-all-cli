/**
 * Created by asarker on 6/17/16.
 */


import  {Component, OnInit, OnDestroy} from "@angular/core";
import {Router, ActivatedRoute, ROUTER_DIRECTIVES} from "@angular/router";
import {MenuComponent} from "./menu.component";
import {HelpTextService} from "../services/helptext.service";
import {HelpText} from "../models/helptext";

@Component({
  templateUrl: '../app/templates/helptext/edit.html',
  providers: [HelpTextService],
  directives: [ROUTER_DIRECTIVES, MenuComponent]
})


export class HelpTextEditComponent implements OnInit, OnDestroy{

  headerTxt:string = 'Edit HelpText';
  helpText:HelpText;
  messages:String[] = [];
  private sub:any;

  constructor(private _router:Router, private _route:ActivatedRoute, private _service:HelpTextService) {
    this.helpText = <HelpText>({
      id: null,
      identifier: '',
      helptext: ''
    });
  }


  private onSubmit() {
    console.log("value: " + this.helpText.id + " identifier : " + this.helpText.identifier + " helpText: " + this.helpText.helptext);

    //update the formatter
    if (this.helpText.id) {
      this._service.updateHelpText(this.helpText).then((data) => {
          if (data) {
            console.log('helpText is updated successfuly', data);
            this._router.navigate(['/helptexts']);
          } else {
            this.messages.push('Failed to update try again');
          }
        },
        (error) => {
          this.messages = error;
          console.log('Failed to update', error);
        });
    }
    else { // create new formatter
      this._service.addTelpText(this.helpText).then((data) => {
          if (data) {
            console.log('help is added successfuly', data);
            this._router.navigate(['/helptexts']);
          } else {
            this.messages.push('Failed to add try again');
          }
        },
        (error) => {
          this.messages = error;
          console.log('Failed to add', error);
        });
      console.log('added post the helpText: ');
    }
  }


  private onCancel() {
    this._router.navigate(['/helptexts']);
  }

  ngOnInit():any {

    this.sub = this._route.params.subscribe(params => {
      var helpTextId = Number(params['id']);
      console.log("helpTextId: " + helpTextId);

      if (isNaN(helpTextId) || helpTextId == 0) {
        this.headerTxt = "Add New HelpText";

      } else {
        this._service.getHelpText(helpTextId).subscribe(
          data => {
            this.helpText = data;
          },
          err=> {
            console.log("error: " + err)
            this.messages = this._service._serviceHelper.getFormattedErrorMessage(err);
          },
          () => {
            console.log("helpText: " + this.helpText.identifier + " helptext: " + this.helpText.helptext);
          }
        );
      }
    });
  }



  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
