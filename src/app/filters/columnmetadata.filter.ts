/**
 * Created by asarker on 6/17/16.
 */


import {Pipe} from "@angular/core";
import {ColumnMetaData} from "../models/columnmetadata";

@Pipe({
  name: 'ColumnMetaDataFilter'
})
export class ColumnMetaDataFilter {

  transform(value: ColumnMetaData[], q: string) {
    if (!q || q === '') {
      return value;
    }
    return value.filter(item => -1 < item.identifier.toLowerCase().indexOf(q.toLowerCase()));
  }
}
