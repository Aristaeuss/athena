import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash'; 

@Pipe({
    name: 'uniqueGBLProgram',
    pure: false
})

export class UniqueGBLProgramPipe implements PipeTransform {
     
    transform(value: any): any{
      
        if(value!== undefined && value!== null){
            return _.uniqBy(value, 'gblProgram'); 
        }

        return value;
  
    }
}