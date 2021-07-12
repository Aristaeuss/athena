import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash'; 

    @Pipe({
      name: 'unico',
      pure: false
    })

    export class UnicoPipe implements PipeTransform {
        transform(value: any): any{
          
                return _.uniqBy(value, 'name');
        
        }
    }