/**
 * Created by asarker on 6/15/16.
 */

import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {ServiceHelper} from "./service.helper";
import {Configuration} from "./constants";
import {Company} from "../models/company";
import {DataService} from "./data.service";
import {Identifier} from "../models/identifier";

@Injectable()
export class IdentifierService{
  private actionUrl:string;

  constructor(public _serviceHelper:ServiceHelper, private _configuration:Configuration, private _dataService:DataService) {
    this.actionUrl = _configuration.ServerWithApiUrl + 'identifiers';
  }

  /**
   * adds an identifier object
   *
   * @param identifier the identifier object
   * @returns {Promise<Response>} the response
   */
  public addIdentifier(identifier:Identifier) {
    return this._dataService.add(this.actionUrl, identifier);
  }

  /**
   * removes an identifier objects
   *
   * @param id the ID of the identifier object
   * @returns {Promise<Response>} the response
   */
  deleteIdentifier(id:number) {
    return this._dataService.remove(this.actionUrl, id);
  }

  /**
   * updates a identifier object
   *
   * @param identifier the identifier object
   * @returns {Promise<Response>} the response
   */
  public updateIdentifier(identifier:Identifier) {
    return this._dataService.update(this.actionUrl, identifier);
  }

  /**
   * gets an identifier object
   *
   * @param id the ID of the object
   * @returns {Observable<R>} the response
   */

  public  getIdentifier(id:number):Observable<Identifier> {
    return this._dataService.getSingle(this.actionUrl, id).map(this.toIdentifier);
  }

  /**
   * gets identifier objects
   *
   * @returns {Observable<R>} the response
   */
  public getIdentifiers():Observable<Identifier[]> {
    return this._dataService.getAll(this.actionUrl).map(this.extractData);
  }


  /**
   * extracts the response and convert to json
   *
   * @param response the response
   * @returns {any|{}} the json of response
   */
  private extractData(response:Response):Identifier[] {
    return response.json() || {};
  }

  /**
   * extracts identifier object from response
   *
   * @param r the response
   * @returns {Application} the appication object
   */
  private toIdentifier(r:any):Identifier {
    r = r.json();
    let identifier = <Identifier>({
      id: r.id,
      name: r.name,
      value_type: r.value_type,
      format: r.format
    });
    console.log("company id : " + identifier.id + " name :" + identifier.name + "  valueType: " + identifier.value_type);
    return identifier;
  }

}
