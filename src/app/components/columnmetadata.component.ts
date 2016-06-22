/**
 * Created by asarker on 6/16/16.
 */
import {OnInit, Component, Input, ChangeDetectionStrategy} from "@angular/core";
import {Router, ROUTER_DIRECTIVES} from "@angular/router";
import {MenuComponent} from "./menu.component";
import {ColumnMetaData} from "../models/columnmetadata";
import {ColumnMetaDataService} from "../services/columnmetadata.service";
import {Observable} from "rxjs/Rx";
import 'rxjs/add/operator/do'
import {PaginationControlsCmp, PaginatePipe, PaginationService} from "ng2-pagination/index";
import {ColumnMetaDataFilter} from "../filters/columnmetadata.filter";

@Component({
  templateUrl: '../app/templates/columnmetadata/columnmetadata.html',
  providers: [ColumnMetaDataService, PaginationService],
  directives: [ROUTER_DIRECTIVES, MenuComponent, PaginationControlsCmp],
  pipes: [PaginatePipe, ColumnMetaDataFilter],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ColumnMetaDataComponent implements  OnInit{

  columnMetaDatum:Observable<ColumnMetaData[]>
  messages:String[] = [];
  filter: string = '';

  currPage: number = 1;
  total: number;
  loading: boolean;
  pageSize: number= 25;
  order: string ='desc';

  constructor(private _router:Router, private _service:ColumnMetaDataService) {

  }

  private onEdit(columnmetadata: ColumnMetaData) {
    this._router.navigate(['/columnmetadata',columnmetadata.id]);
  }
  getPage(page: number) {
    this.loading = true;
    this.columnMetaDatum = this._service.getColumnMetaDatumByPage(page-1, this.pageSize,this.order).do(res=>{
      this.total = res.total;
      this.currPage = page;
      this.loading = false;
    }).map(res=> res.items);
  }

  private delete(columnmetadata:ColumnMetaData){
    this._service.deleteColumnMetaData(columnmetadata.id).then(data => {
        if (data) {
          window.location.reload();
          //this._router.renavigate();
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
   // this.getColumnMetaDatum();
    this.getPage(1);
  }

  private getColumnMetaDatum() {
   /* this._service.getColumnMetaDatum().subscribe(
      data => {
        this.columnMetaDatum = data;
      },
      error => {
        this.messages = this._service._serviceHelper.getFormattedErrorMessage(error)
        console.log("failed to get list")
      }
    );*/
  }
}
