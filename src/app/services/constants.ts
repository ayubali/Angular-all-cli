/**
 * Created by asarker on 6/10/16.
 */
import {Injectable} from '@angular/core';

@Injectable()
export class Configuration {
  public Server:string = "http://localhost:9000/";
  public ApiUrl:string = "km/api/v1/3b6bd8522c4627a0/";
  public ServerWithApiUrl = this.Server + this.ApiUrl;
}
