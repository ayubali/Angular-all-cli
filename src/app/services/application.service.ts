/**
 * Created by asarker on 6/15/16.
 */

import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {ServiceHelper} from "./service.helper";
import {Configuration} from "./constants";
import {Application} from "../models/application";
import {Observable} from "rxjs/Rx";
import {DataService} from "./data.service";

@Injectable()
export class ApplicationService {
  private actionUrl:string;

  constructor(public _serviceHelper:ServiceHelper, private _configuration:Configuration, private _dataService:DataService) {
    this.actionUrl = _configuration.ServerWithApiUrl + 'applications';
  }

  /**
   * adds an application object
   *
   * @param application the application object
   * @returns {Promise<Response>} the response
   */
  public addApplication(application:Application) {
    return this._dataService.add(this.actionUrl, application);
  }

  /**
   * removes an application objects
   *
   * @param id the ID of the application object
   * @returns {Promise<Response>} the response
   */
  deleteApplication(id:number) {
    return this._dataService.remove(this.actionUrl, id);
  }

  /**
   * updates a appilcation object
   *
   * @param application the application object
   * @returns {Promise<Response>} the response
   */
  public updateApplication(application:Application) {
    return this._dataService.update(this.actionUrl, application);
  }


  /**
   * gets an application object
   *
   * @param id the ID of the object
   * @returns {Observable<R>} the response
   */
  public  getApplication(id:number):Observable<Application> {
    return this._dataService.getSingle(this.actionUrl, id).map(this.toApplication);
  }

  /**
   * gets application objects
   *
   * @returns {Observable<R>} the response
   */

  public getApplications():Observable<Application[]> {
   // return this._dataService.getAll(this.actionUrl).map(this.extractData);
    return this._dataService.getAllByPage(this.actionUrl,0,5,'desc').map(this.extractData);
  }


  /**
   * extracts the response and convert to json
   *
   * @param response the response
   * @returns {any|{}} the json of response
   */
  private extractData(response:Response):Application[] {
    return response.json() || {};
  }

  /**
   * extracts application object from response
   *
   * @param r the respone
   * @returns {Application} the appication object
   */
  private toApplication(r:any):Application {
    r = r.json();
    let application = <Application>({
      id: r.id,
      name: r.name,
      api_token: r.api_token,
    });
    console.log("company id : " + application.id + " name :" + application.name + "  api_token: " + application.api_token);
    return application;
  }

}
