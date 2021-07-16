import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash'; 

@Pipe({
    name: 'uniqueCountry',
    pure: false
})

export class UniqueCountryPipe implements PipeTransform {
     
    transform(value: any): any{
      
        if(value!== undefined && value!== null){
            return _.uniqBy(value, 'country'); 
        }

        return value;
  
    }
}