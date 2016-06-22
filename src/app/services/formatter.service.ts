/**
 * Created by asarker on 6/15/16.
 */
import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {ServiceHelper} from "./service.helper";
import {Configuration} from "./constants";
import {DataService} from "./data.service";
import {Formatter} from "../models/formatter";

@Injectable()
export class  FormatterService{

  private actionUrl:string;

  constructor(public _serviceHelper:ServiceHelper, private _configuration:Configuration, private _dataService:DataService) {
    this.actionUrl = _configuration.ServerWithApiUrl + 'formatters';
  }

  /**
   * adds an formatter object
   *
   * @param company the formatter object
   * @returns {Promise<Response>} the response
   */
  public addFormatter(formatter:Formatter) {
    return this._dataService.add(this.actionUrl, formatter);
  }

  /**
   * removes an formatter objects
   *
   * @param id the ID of the formatter object
   * @returns {Promise<Response>} the response
   */
  deleteFormatter(id:number) {
    return this._dataService.remove(this.actionUrl, id);
  }

  /**
   * updates a formatter object
   *
   * @param formatter the formatter object
   * @returns {Promise<Response>} the response
   */
  public updateFormatter(formatter:Formatter) {
    return this._dataService.update(this.actionUrl, formatter);
  }

  /**
   * gets an formatter object
   *
   * @param id the ID of the object
   * @returns {Observable<R>} the response
   */

  public  getFormatter(id:number):Observable<Formatter> {
    return this._dataService.getSingle(this.actionUrl, id).map(this.toFormatter);
  }

  /**
   * gets formatter objects
   *
   * @returns {Observable<R>} the response
   */
  public getFormatters():Observable<Formatter[]> {
    return this._dataService.getAll(this.actionUrl).map(this.extractData);
  }


  /**
   * extracts the response and convert to json
   *
   * @param response the response
   * @returns {any|{}} the json of response
   */
  private extractData(response:Response):Formatter[] {
    return response.json() || {};
  }

  /**
   * extracts formatter object from response
   *
   * @param r the response
   * @returns {Application} the formatter object
   */
  private toFormatter(r:any):Formatter {
    r = r.json();
    let formatter = <Formatter>({
      id: r.id,
      identifier: r.identifier,
      format: r.format
    });
    console.log("formatter id : " + formatter.id + " identifier :" + formatter.identifier + "  format: " + formatter.format);
    return formatter;
  }
}
