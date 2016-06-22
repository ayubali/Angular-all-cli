/**
 * Created by asarker on 6/16/16.
 */
import {Router, ActivatedRoute, ROUTER_DIRECTIVES} from "@angular/router";
import {MenuComponent} from "./menu.component";
import  {Component, OnInit, OnDestroy} from "@angular/core";
import {ColumnMetaData} from "../models/columnmetadata";
import {ColumnMetaDataService} from "../services/columnmetadata.service";
import {Formatter} from "../models/formatter";
import {FormatterService} from "../services/formatter.service";

@Component({
  templateUrl: '../app/templates/columnmetadata/edit.html',
  providers: [ColumnMetaDataService, FormatterService],
  directives: [ROUTER_DIRECTIVES, MenuComponent]
})

export class ColumnMetaDataEditComponent implements OnInit, OnDestroy {
  headerTxt:string = 'Edit Column Meta Data';
  columnmetadata:ColumnMetaData;
  messages:String[] = [];
  formatters:Formatter[] = [];
  visibles:boolean[] = [true, false];
  edibiles:boolean[] = [true, false];
  internals:boolean[] = [true, false];
  private sub:any;

  constructor(private _router:Router, private _route:ActivatedRoute, private _service:ColumnMetaDataService, private _formatterService:FormatterService) {
    this.columnmetadata = <ColumnMetaData>({
      id: null,
      identifier: '',
      visible: false,
      editable: false,
      internal: false,
      display_name: '',
      internal_name: '',
      value_type: '',
      formatter_id: null
    });
  }

  private onSubmit() {
    this.columnmetadata.formatter_id = Number(this.columnmetadata.formatter_id);
    var isTrue:any;

    if (typeof  this.columnmetadata.visible == 'string') {
      isTrue = this.columnmetadata.visible;
      this.columnmetadata.visible = isTrue == 'true';
    }

    if (typeof  this.columnmetadata.editable == 'string') {
      isTrue = this.columnmetadata.editable;
      this.columnmetadata.editable = isTrue == 'true';
    }


    if (typeof  this.columnmetadata.internal == 'string') {
      isTrue = this.columnmetadata.internal;
      this.columnmetadata.internal = isTrue == 'true';
    }


    //this.columnmetadata.visible  = Boolean(this.columnmetadata.visible);
    this.columnmetadata.editable = Boolean(this.columnmetadata.editable);
    this.columnmetadata.internal = Boolean(this.columnmetadata.internal);


    //update the company
    if (this.columnmetadata.id) {
      this._service.updateColumnMetaData(this.columnmetadata).then((data) => {
          if (data) {
            console.log('Column meta data is updated successfuly', data);
            this._router.navigate(['/columnmetadata']);
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
      this._service.addColumnMetaData(this.columnmetadata).then((data) => {
          if (data) {
            console.log('Colum meta data is added successfuly', data);
            this._router.navigate(['/columnmetadata']);
          } else {
            this.messages.push('Failed to add try again');
          }
        },
        (error) => {
          this.messages = error;
          console.log('Failed to add', error);
        });
      console.log('add post the ColumnMetaData: ');
    }
  }


  private onCancel() {
    this._router.navigate(['/columnmetadata']);
  }

  ngOnInit():any {

    this.sub = this._route.params.subscribe(params => {
      var columnmetadataId = Number(params['id']);
      console.log("columnmetadataId: " + columnmetadataId);

      if (isNaN(columnmetadataId) || columnmetadataId == 0) {
        this.headerTxt = "Add New Column Meta Data";

      } else {
        this._service.getColumnMetaData(columnmetadataId).subscribe(
          data => {
            this.columnmetadata = data;
          },
          err=> {
            console.log("error: " + err)
            this.messages = this._service._serviceHelper.getFormattedErrorMessage(err);
          },
          () => {
            console.log("columnmetadata: " + this.columnmetadata.identifier + " name: " + this.columnmetadata.display_name);
          }
        );
      }
    });


    this.getFormatters();
  }

  private getFormatters() {
    this._formatterService.getFormatters().subscribe(
      data => {
        this.formatters = data;
      },
      error => {
        this.messages = this._service._serviceHelper.getFormattedErrorMessage(error)
        console.log("failed to get formatter list")
      }
    );
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
