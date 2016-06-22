/**
 * Created by asarker on 6/15/16.
 */

import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {ServiceHelper} from "./service.helper";
import {Configuration} from "./constants";
import {Observable} from "rxjs/Rx";
import {DataService} from "./data.service";
import {Validation} from "../models/validation";

@Injectable()
export class ValidationService {
  private actionUrl:string;

  constructor(public _serviceHelper:ServiceHelper, private _configuration:Configuration, private _dataService:DataService) {
    this.actionUrl = _configuration.ServerWithApiUrl + 'validations';
  }

  /**
   * adds an validation object
   *
   * @param validation the validation object
   * @returns {Promise<Response>} the response
   */
  public addValidation(validation: Validation) {
    return this._dataService.add(this.actionUrl, validation);
  }

  /**
   * removes an validation objects
   *
   * @param id the ID of the validation object
   * @returns {Promise<Response>} the response
   */
  deleteValidation(id:number) {
    return this._dataService.remove(this.actionUrl, id);
  }

  /**
   * updates a validation object
   *
   * @param validation the validation object
   * @returns {Promise<Response>} the response
   */
  public updateValidation(validation:Validation) {
    return this._dataService.update(this.actionUrl, validation);
  }

  /**
   * gets an  validation object
   *
   * @param id the ID of the object
   * @returns {Observable<R>} the response
   */
  public  getValidation(id:number):Observable<Validation> {
    return this._dataService.getSingle(this.actionUrl, id).map(this.toValidation);
  }

  /**
   * gets validation objects
   *
   * @returns {Observable<R>} the response
   */

  public getValidations():Observable<Validation[]> {
    // return this._dataService.getAll(this.actionUrl).map(this.extractData);
    return this._dataService.getAll(this.actionUrl).map(this.extractData);
  }


  /**
   * extracts the response and convert to json
   *
   * @param response the response
   * @returns {any|{}} the json of response
   */
  private extractData(response:Response):Validation[] {
    return response.json() || {};
  }

  /**
   * extracts validations object from response
   *
   * @param r the respone
   * @returns {Application} the appication object
   */
  private toValidation(r:any):Validation {
    r = r.json();
    let validation = <Validation>({
      id: r.id,
      rule: r.rule,
      identifier_id: r.identifier.id,
      identifier: {
        id:  r.identifier.id,
        name :  r.identifier.name,
        format:  r.identifier.format,
        value_type:  r.identifier.value_type,
        display_name:  r.identifier.display_name,
      }
    });
    console.log("company id : " + validation.id + " name :" + validation.rule + "  indetifier.name: " + validation.identifier.name);
    return validation;
  }

}
