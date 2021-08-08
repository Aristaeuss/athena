import {Pipe, PipeTransform} from '@angular/core';
import { Occupation } from '../model/occupation';
import { Sector } from '../model/sector';

@Pipe({name: 'sortSectorsOrOccupations'})

export class SectorOrOccupationSortPipe implements PipeTransform {
    transform(value: Sector[] | Occupation[]) : any {
        value.sort(function(a:Sector|Occupation,b:Sector|Occupation) {
            let alc = a.description.toLowerCase(),
            blc = b.description.toLowerCase();
        
            return alc > blc ? 1 : alc < blc ? -1 : 0;
        });
    
    return value;
  }
}