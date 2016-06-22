/**
 * Created by asarker on 6/16/16.
 */

import {Injectable} from "@angular/core";
import {Response, Http} from "@angular/http";
import {ServiceHelper} from "./service.helper";
import {Configuration} from "./constants";
import {Observable} from "rxjs/Rx";
import {DataService} from "./data.service";
import {ColumnMetaData} from "../models/columnmetadata";


@Injectable()

export class ColumnMetaDataService {
  private actionUrl:string;

  constructor(public _serviceHelper:ServiceHelper, private _configuration:Configuration, private _dataService:DataService) {
    this.actionUrl = _configuration.ServerWithApiUrl + 'column_meta_data';
  }

  /**
   * adds an columnmetadata object
   *
   * @param application the columnmetadata object
   * @returns {Promise<Response>} the response
   */
  public addColumnMetaData(columnMetadata:ColumnMetaData) {
    return this._dataService.add(this.actionUrl, columnMetadata);
  }

  /**
   * removes an columnmetadata objects
   *
   * @param id the ID of the columnmetadata object
   * @returns {Promise<Response>} the response
   */
  deleteColumnMetaData(id:number) {
    return this._dataService.remove(this.actionUrl, id);
  }

  /**
   * updates a columnmetadata object
   *
   * @param application the application object
   * @returns {Promise<Response>} the response
   */
  public updateColumnMetaData(columnMetadata:ColumnMetaData) {
    return this._dataService.update(this.actionUrl, columnMetadata);
  }

  /**
   * gets an columnmetadata object
   *
   * @param id the ID of the object
   * @returns {Observable<R>} the response
   */
  public  getColumnMetaData(id:number):Observable<ColumnMetaData> {
    return this._dataService.getSingle(this.actionUrl, id).map(this.toColumnMetaData);
  }

  /**
   * gets columnmetadata objects
   *
   * @returns {Observable<R>} the response
   */

  public getColumnMetaDatum():Observable<ColumnMetaData[]> {
    return this._dataService.getAll(this.actionUrl).map(this.extractData);
  }

  /**
   * gets columnmetadata objects
   *
   * @returns {Observable<R>} the response
   */

  public getColumnMetaDatumByPage(page:number, size:number, order:string):Observable<IServerPagedResponse<ColumnMetaData>> {
    return this._dataService.getAllByPage(this.actionUrl, page, size, order).map(this.extractPagedData);
  }

  private extractPagedData(response:Response):IServerPagedResponse<ColumnMetaData> {
    var contentRangeHeader = response.headers.get('Content-Range').split(";")[1];
    var totalrows = Number.parseInt(contentRangeHeader.substr(contentRangeHeader.indexOf(":")+1));
    let serverRes = <IServerPagedResponse<ColumnMetaData>>({
      items: response.json(),
      total: totalrows
    })

    return serverRes;
  }


  /**
   * extracts the response and convert to json
   *
   * @param response the response
   * @returns {any|{}} the json of response
   */
  private extractData(response:Response):ColumnMetaData[] {
    return response.json() || {};
  }

  /**
   * extracts columnmetadata object from response
   *
   * @param r the respone
   * @returns {Application} the columnmetaData object
   */
  private toColumnMetaData(r:any):ColumnMetaData {
    r = r.json();
    let columnMetaData = <ColumnMetaData>({
      id: r.id,
      identifier: r.identifier,
      visible: r.visible,
      editable: r.editable,
      internal: r.internal,
      display_name: r.display_name,
      internal_name: r.internal_name,
      value_type: r.value_type,
      formatter_id: r.formatter_id
    });
    console.log("ColumnMetaData id : " + columnMetaData.id + " identifier :" + columnMetaData.identifier + "  visibible: " + columnMetaData.visible + "  editable: " + columnMetaData.editable + " internal: " + columnMetaData.internal + " display_name: " + columnMetaData.display_name + " internal name: " + columnMetaData.internal_name + " value-type: " + columnMetaData.value_type + " formatter-id: " + columnMetaData.formatter_id);
    return columnMetaData;
  }
}
