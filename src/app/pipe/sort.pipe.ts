import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'sortBy'})

export class SortPipe implements PipeTransform {
    transform(value: any) : any {
        value.sort(function(a:any,b:any){
            let alc = a.toLowerCase(),
            blc = b.toLowerCase();
        
            return alc > blc ? 1 : alc < blc ? -1 : 0;
        });
    
    return value;
  }
}