/**
 * Created by asarker on 6/14/16.
 */

import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {ServiceHelper} from "./service.helper";
import {Configuration} from "./constants";
import {Company} from "../models/company";
import {DataService} from "./data.service";

@Injectable()
export class CompanyService {

  private actionUrl:string;

  constructor(public _serviceHelper:ServiceHelper, private _configuration:Configuration, private _dataService:DataService) {
    this.actionUrl = _configuration.ServerWithApiUrl + 'companies';
  }

  /**
   * adds an company object
   *
   * @param company the company object
   * @returns {Promise<Response>} the response
   */
  public addCompany(company:Company) {
    return this._dataService.add(this.actionUrl, company);
  }

  /**
   * removes an company objects
   *
   * @param id the ID of the company object
   * @returns {Promise<Response>} the response
   */
  deleteCompany(id:number) {
    return this._dataService.remove(this.actionUrl, id);
  }

  /**
   * updates a company object
   *
   * @param company the company object
   * @returns {Promise<Response>} the response
   */
  public updateCompany(company:Company) {
    return this._dataService.update(this.actionUrl, company);
  }

  /**
   * gets an company object
   *
   * @param id the ID of the object
   * @returns {Observable<R>} the response
   */

  public  getCompany(id:number):Observable<Company> {
    return this._dataService.getSingle(this.actionUrl, id).map(this.toCompany);
  }

  /**
   * gets company objects
   *
   * @returns {Observable<R>} the response
   */
  public getCompanies():Observable<Company[]> {
    return this._dataService.getAll(this.actionUrl).map(this.extractData);
  }


  /**
   * extracts the response and convert to json
   *
   * @param response the response
   * @returns {any|{}} the json of response
   */
  private extractData(response:Response):Company[] {
    return response.json() || {};
  }

  /**
   * extracts company object from response
   *
   * @param r the response
   * @returns {Application} the appication object
   */
  private toCompany(r:any):Company {
    r = r.json();
    let company = <Company>({
      id: r.id,
      name: r.name,
      display_name: r.display_name,
      logo_url: r.logo_url,
      updated_by_id: r.updated_by_id,
      created_by_id: r.created_by_id
    });
    console.log("company id : " + company.id + " name :" + company.name + "  logo: " + company.logo_url);
    return company;
  }

}
