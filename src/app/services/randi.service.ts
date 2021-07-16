import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { FilterData } from '../model/filterData';
import { RandiDataResponse } from '../model/randiDataResponse';

@Injectable({
  providedIn: 'root'
})

export class RandiService {

  private baseUrl = 'http://localhost:8080';
  
  constructor(private http: HttpClient) { }

  private subscription: Subscription | null = null;
  
  private notifyFunctions: Function[] = [];
  private errorFunctions: Function[] = [];

  private rAndIDataObservable: Observable<RandiDataResponse> = new Observable((observer) => {
    let notiFunc = (randiDataAndFields: RandiDataResponse) => observer.next(randiDataAndFields);
    this.notifyFunctions.push(notiFunc);
    let errFunc = (err: any) => observer.error(err);
    this.errorFunctions.push(errFunc);
    let removeFunctions = () => {
      this.notifyFunctions.splice(this.notifyFunctions.indexOf(notiFunc), 1);
      this.errorFunctions.splice(this.errorFunctions.indexOf(errFunc), 1);
    }
    return {unsubscribe(){
      removeFunctions();
    }};
  });

  getRandiData(filterData: FilterData): Observable<RandiDataResponse> {
    this.requestRAndIData(filterData);
    return this.rAndIDataObservable;
  }

  public refreshRAndiData(filterData: FilterData): void {
    this.requestRAndIData(filterData);
  }

  private requestRAndIData(filterData: FilterData): void {
    
    const req = new HttpRequest<FilterData>('POST', this.baseUrl + "/RAndIProjects", filterData, {
      responseType: 'json'
    });
    
    this.subscription = this.http.request(req).subscribe(
      (event: any) => {
        if (event instanceof HttpResponse) {
          if (event.status != HttpStatusCode.Ok) {
            let errorMessage: String = event.status + ": " + event.statusText
            console.log(errorMessage);
            this.errorFunctions.forEach((errorFunction: Function) => errorFunction(errorMessage));
          } else {
            this.notifyFunctions.forEach((notifyFunction: Function) => notifyFunction({
              randiData: event.body.RAndIProjects,
              fieldLists: event.body.fieldLists,
              numberOfDataLeft: event.body.numProjectsLeft,
              excelLastUpdateTime: event.body.excelLastUpdateTime
            }));
          }
          this.subscription?.unsubscribe();
        }
      },
      (err: any) => {
        console.log(err);
        this.errorFunctions.forEach((errorFunction: Function) => errorFunction(err));
        this.subscription?.unsubscribe();
      }
    );
  }

}
