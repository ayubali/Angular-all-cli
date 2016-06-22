import {Identifier} from "./identifier";

/**
 * Created by asarker on 6/15/16.
 */

export interface Validation{
  id?:number;
  identifier_id?:number;
  identifier?:Identifier;
  rule:string;
}
