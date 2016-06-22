import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {JwtHelper, AuthHttp} from "angular2-jwt/angular2-jwt";
import {Observable} from 'rxjs/Rx';
import {Company} from "../../models/company";

@Injectable()
export class AuthService {
 public isLoggedin:boolean;
  jwtHelper:JwtHelper = new JwtHelper();
  private baseUrl:string = 'http://swapi.co/api';

  constructor(private _http:Http, private authHttp:AuthHttp) {

  }

  loginfn(usercreds:any) {
    this.isLoggedin = false;
    var headers = new Headers();
    //var creds = 'name=' + usercreds.username + '&password=' + usercreds.password;
    var creds = {
      user: {
        email: usercreds.username,
        password: usercreds.password
      }
    }

    headers.append('Content-Type', 'application/json');
    /* headers.append('Access-Control-Allow-Origin', '*');
     headers.append('Access-Control-Allow-Headers', 'Content-Type');
     headers.append('Access-Control-Allow-Methods', 'POST');*/

    return new Promise((resolve) => {

      this._http.post('http://localhost:9000/km/api/v1/3b6bd8522c4627a0/login', JSON.stringify(creds), {headers: headers}).subscribe((data) => {
          window.localStorage.setItem('auth_key', data.json().session.api_token);
          this.isLoggedin = true;
          resolve(this.isLoggedin)
          console.log(" expiration: " + this.jwtHelper.getTokenExpirationDate(data.json().session.api_token))
          console.log("data: " + JSON.stringify(data))
        },
        (err) => {

          console.log(err)
        },
        () => {
          console.log("authentication complete")
        }
      )

    })
  }

  deleteCompany(id:number) {
    return new Promise((resolve, reject) => {
      return this.authHttp.delete('http://localhost:9000/km/api/v1/3b6bd8522c4627a0/companies/' + id).subscribe((data) => {
          if (data.ok) {
            resolve(true);
          }
        },
        (err) => {
          reject(this.getFormattedErrorMessage(err))
        },
        () => {
          console.log("delete is completed")
        }
      )
    })
  }

  public getFormattedErrorMessage(err:any):any {
    var errors:String[] = [];
    console.log(" ERR: " + JSON.stringify(err));

    if (!err.ok) {
      var jsonMessage = JSON.parse(err._body).error;
      errors.push(jsonMessage.message)
      if (jsonMessage.code == 422) {
        for (let errMessage of jsonMessage.errors) {
          errors.push(errMessage)
        }
      }
    }
    else {
      if (err.url == null && err.type == 3) {
        errors.push("External Server is down")
      }
    }
    console.log(" ERROR: " + JSON.stringify(err._body));
    return errors;
  }


  public updateCompany(company:Company) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return new Promise((resolve, reject) => {
      return this.authHttp.put('http://localhost:9000/km/api/v1/3b6bd8522c4627a0/companies', JSON.stringify(company), {headers: headers}).subscribe((data) => {
          if (data.ok) {
            resolve(true);
          }
        },
        (err) => {
          reject(this.getFormattedErrorMessage(err))
        },
        () => {
          console.log("update is completed")
        }
      )
    })
  }

  public addCompany(company:Company) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return new Promise((resolve, reject) => {
      return this.authHttp.post('http://localhost:9000/km/api/v1/3b6bd8522c4627a0/companies', JSON.stringify(company), {headers: headers}).subscribe((data) => {
          if (data.ok) {
            resolve(true);
          }
        },
        (err) => {
          reject(this.getFormattedErrorMessage(err))
        },
        () => {
          console.log("update is completed")
        }
      )
    })
  }


  testJsonDataUingAUthenHttp() {
    var myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');
    myHeader.append('Range', 'page:0;size:20;order:desc');
    return this.authHttp.get('http://localhost:9000/km/api/v1/3b6bd8522c4627a0/companies', {headers: myHeader})
      .subscribe(
        data => console.log(""),
        err => console.log(err),
        () => console.log('Request Complete')
      );
  }


  getCompanies():Observable<Company[]> {
    var myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');
    //myHeader.append('Range', 'page:0;size:20;order:desc');
    return this.authHttp.get('http://localhost:9000/km/api/v1/3b6bd8522c4627a0/companies', {headers: myHeader})
      .map(this.extractData)
  }


  private extractData(response:Response):Company[] {
    /* let body = res.json().map((r:any)=> {
     let dashboard = <Company>({
     id: r.id,
     name: r.name,
     display_name: r.display_name,
     logo_url: r.logo_url,
     updated_by_id: r.updated_by_id,
     created_by_id: r.created_by_id
     });
     console.log("companyL : " + dashboard.name +"     logo: "+ dashboard.logo_url)
     return dashboard;
     });*/
    return response.json() || {};
  }


  private extractCompanyData(response:Response):Company {
    let body = response.json().map((r:any)=> {
      let company = <Company>({
        id: r.id,
        name: r.name,
        display_name: r.display_name,
        logo_url: r.logo_url,
        updated_by_id: r.updated_by_id,
        created_by_id: r.created_by_id
      });
      console.log("companyL : " + company.name + "     logo: " + company.logo_url)
      return company;
    });
    return body || {};
  }

  public  getCompany(id:number):Observable<Company> {
    var myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');
    return this.authHttp.get('http://localhost:9000/km/api/v1/3b6bd8522c4627a0/companies/' + id, {headers: myHeader})
      .map(this.toCompany)
  }


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


  private handleError(error:any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
