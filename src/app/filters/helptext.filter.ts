/**
 * Created by asarker on 6/17/16.
 */

import {Pipe} from "@angular/core";
import {HelpText} from "../models/helptext";

@Pipe({
  name: 'HelpTextFilter'
})

export class HelpTextFilter {

  transform(value: HelpText[], q: string) {

    if (!q || q === '') {
      return value;
    }
    return value.filter(item => -1 < item.identifier.toLowerCase().indexOf(q.toLowerCase()));
  }
}
