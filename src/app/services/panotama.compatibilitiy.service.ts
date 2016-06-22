/**
 * Created by asarker on 6/17/16.
 */

import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {ServiceHelper} from "./service.helper";
import {Configuration} from "./constants";
import {DataService} from "./data.service";
import {PanoramaCompatibility} from "../models/panoramacompatibily";

@Injectable()
export class PanoramaCompatibilityService{
  private actionUrl:string;

  constructor(public _serviceHelper:ServiceHelper, private _configuration:Configuration, private _dataService:DataService) {
    this.actionUrl = _configuration.ServerWithApiUrl + 'panorama_compatibilities';
  }

  /**
   * adds an panoramacompatibility object
   *
   * @param panoramaCompatibility the panoramacompatibility object
   * @returns {Promise<Response>} the response
   */
  public addPanoramaCompatibility(panoramaCompatibility:PanoramaCompatibility) {
    return this._dataService.add(this.actionUrl, panoramaCompatibility);
  }

  /**
   * removes an panoramacompatibility objects
   *
   * @param id the ID of the panoramacompatibility object
   * @returns {Promise<Response>} the response
   */
  deletePanoramaCompatibility(id:number) {
    return this._dataService.remove(this.actionUrl, id);
  }

  /**
   * updates a panoramacompatibility object
   *
   * @param company the panoramacompatibility object
   * @returns {Promise<Response>} the response
   */
  public updatePanoramaCompatibility(panoramaCompatibility:PanoramaCompatibility) {
    return this._dataService.update(this.actionUrl, panoramaCompatibility);
  }

  /**
   * gets an panoramacompatibility object
   *
   * @param id the ID of the object
   * @returns {Observable<R>} the response
   */

  public  getPanoramaCompatibility(id:number):Observable<PanoramaCompatibility> {
    return this._dataService.getSingle(this.actionUrl, id).map(this.toPanoramaCompatibility);
  }

  /**
   * gets panoramaCompatibility objects
   *
   * @returns {Observable<R>} the response
   */
  public getPanoramaCompatibilities():Observable<PanoramaCompatibility[]> {
    return this._dataService.getAll(this.actionUrl).map(this.extractData);
  }


  /**
   * extracts the response and convert to json
   *
   * @param response the response
   * @returns {any|{}} the json of response
   */
  private extractData(response:Response):PanoramaCompatibility[] {
    return response.json() || {};
  }

  /**
   * extracts panoramaCompatibility object from response
   *
   * @param r the response
   * @returns {panoramaCompatibility} the panoramaCompatibility object
   */
  private toPanoramaCompatibility(r:any):PanoramaCompatibility {
    r = r.json();
    let panoramaCompatibility = <PanoramaCompatibility>({
      id: r.id,
      panorama_version: r.panorama_version,
      te_version: r.te_version,
    });
    console.log("panorama id : " + panoramaCompatibility.id + " panorama_version :" + panoramaCompatibility.panorama_version + "  te_version: " + panoramaCompatibility.te_version);
    return panoramaCompatibility;
  }
}
