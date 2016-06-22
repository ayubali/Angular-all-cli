/**
 * Created by asarker on 6/10/16.
 */

import {Injectable} from '@angular/core';
import {Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map'
import {Observable} from 'rxjs/Observable';
import {Configuration} from "./constants";
import {AuthHttp} from "angular2-jwt/angular2-jwt";
import {ServiceHelper} from "./service.helper";

@Injectable()
export class DataService {

  private headers:Headers;

  constructor(private _authHttp:AuthHttp, private _configuration:Configuration, public _serviceHelper:ServiceHelper) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  /**
   * gets all data from  the remote server
   *
   * @param actionUrl the remote server url
   * @returns {Observable<Response>} the response
   */
  public getAll = (actionUrl:string):Observable<Response> => {
    return this._authHttp.get(actionUrl, {headers: this.headers});
  }
  /**
   * gets all data by page from  the remote server
   *
   * @param actionUrl the remote server url
   * @param page the page number
   * @param size the size of the page
   * @param order the order of entity
   * @returns {Observable<Response>} the response
   */
  public getAllByPage = (actionUrl:string, page:Number, size:Number, order:String):Observable<Response> => {
    //this._dataService.getAllByPage(this.actionUrl,0,5,'desc').map(this.extractData);
    var headers =  new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Range', 'page:' + page + ';size:' + size + ';order:' + order);
    headers.append('Authorization', window.localStorage.getItem('auth_key'));
    return this._authHttp.get(actionUrl, {headers: headers});
  }

  /**
   * gets single entity from the remote server
   *
   * @param actionUrl the remote server url
   * @param id the id of the entity
   * @returns {Observable<Response>} the response
   */
  public getSingle = (actionUrl:string, id:number):Observable<Response> => {
    return this._authHttp.get(actionUrl + '/' + id, {headers: this.headers});
  }
  /**
   * adds an entity to remove server
   *
   * @param actionUrl the remote server url
   * @param data the payload data
   * @returns {Promise<T>} the response
   */
  public add = (actionUrl:string, data:any):Promise<Response> => {
    var payload = JSON.stringify(data);
    return new Promise((resolve, reject) => {
      return this._authHttp.post(actionUrl, payload, {headers: this.headers}).subscribe((data) => {
          if (data.ok) {
            resolve(true);
          }
        },
        (err) => {
          reject(this._serviceHelper.getFormattedErrorMessage(err))
        },
        () => {
          console.log("Addition is completed by data service")
        }
      )
    });
  }

  /**
   * updates an entity to remote server
   *
   * @param actionUrl the remote server url
   * @param data the payload data
   * @returns {Promise<T>} the response
   */
  public update = (actionUrl:string, data:any):Promise<Response> => {
    var payload = JSON.stringify(data);
    return new Promise((resolve, reject) => {
      return this._authHttp.put(actionUrl, payload, {headers: this.headers}).subscribe((data) => {
          if (data.ok) {
            resolve(true);
          }
        },
        (err) => {
          reject(this._serviceHelper.getFormattedErrorMessage(err))
        },
        () => {
          console.log("update is completed by data service")
        }
      )
    });
  }

  /**
   * removes the entity from remote server
   *
   * @param actionUrl  the remote server url
   * @param id the id to the entity
   * @returns {Promise<T>} the response
   */
  public remove = (actionUrl:string, id:number):Promise<Response> => {
    return new Promise((resolve, reject) => {
      return this._authHttp.delete(actionUrl + '/' + id).subscribe((data) => {
          if (data.ok) {
            resolve(true);
          }
        },
        (err) => {
          reject(this._serviceHelper.getFormattedErrorMessage(err))
        },
        () => {
          console.log("delete is completed by data service")
        }
      )
    });
  }
}
