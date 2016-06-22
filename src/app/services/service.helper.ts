/**
 * Created by asarker on 6/14/16.
 */

import {Injectable} from "@angular/core";

@Injectable()
export class ServiceHelper {

  public getFormattedErrorMessage(err:any):any {
    var errors:String[] = [];
    console.log(" ERR: " + JSON.stringify(err));

    if (!err.ok && JSON.stringify(err).indexOf('error') != -1) {
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
}

