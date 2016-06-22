/**
 * Created by asarker on 6/17/16.
 */

import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {ServiceHelper} from "./service.helper";
import {Configuration} from "./constants";
import {DataService} from "./data.service";
import {Formatter} from "../models/formatter";
import {HelpText} from "../models/helptext";

@Injectable()
export class HelpTextService{
  private actionUrl:string;

  constructor(public _serviceHelper:ServiceHelper, private _configuration:Configuration, private _dataService:DataService) {
    this.actionUrl = _configuration.ServerWithApiUrl + 'help_texts';
  }

  /**
   * adds an helpText object
   *
   * @param company the helpText object
   * @returns {Promise<Response>} the response
   */
  public addTelpText(helpText:HelpText) {
    return this._dataService.add(this.actionUrl, helpText);
  }

  /**
   * removes an helpText objects
   *
   * @param id the ID of the helpText object
   * @returns {Promise<Response>} the response
   */
  deleteHelpText(id:number) {
    return this._dataService.remove(this.actionUrl, id);
  }

  /**
   * updates a helpText object
   *
   * @param helpText the helpText object
   * @returns {Promise<Response>} the response
   */
  public updateHelpText(helpText:HelpText) {
    return this._dataService.update(this.actionUrl, helpText);
  }

  /**
   * gets an helpText object
   *
   * @param id the ID of the object
   * @returns {Observable<R>} the response
   */

  public  getHelpText(id:number):Observable<HelpText> {
    return this._dataService.getSingle(this.actionUrl, id).map(this.toHelpText);
  }

  /**
   * gets helpText objects
   *
   * @returns {Observable<R>} the response
   */
  public getHelpTexts():Observable<HelpText[]> {
    return this._dataService.getAll(this.actionUrl).map(this.extractData);
  }


  /**
   * extracts the response and convert to json
   *
   * @param response the response
   * @returns {any|{}} the json of response
   */
  private extractData(response:Response):HelpText[] {
    return response.json() || {};
  }

  /**
   * extracts helpText object from response
   *
   * @param r the response
   * @returns {Application} the helpText object
   */
  private toHelpText(r:any):HelpText {
    r = r.json();
    let helpText = <HelpText>({
      id: r.id,
      identifier: r.identifier,
      helptext: r.helptext
    });
    console.log("helpText id : " + helpText.id + " identifier :" + helpText.identifier + "  helpText: " + helpText.helptext);
    return helpText;
  }
}
