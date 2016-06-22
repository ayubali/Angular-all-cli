/**
 * Created by asarker on 6/16/16.
 */
export interface ColumnMetaData{
  id?:number;
  identifier:string;
  visible?:boolean;
  editable?:boolean
  internal?:boolean;
  display_name?:string;
  internal_name?:string;
  value_type?:string;
  formatter_id?:number;
}
