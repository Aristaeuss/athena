import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { FilterData } from '../model/filterData';
import { RandiDataResponse } from '../model/randiDataResponse';

@Injectable({
  providedIn: 'root'
})

export class RandiService {

  private baseUrl = 'http://localhost:8080';
  
  constructor(private http: HttpClient) { }
  
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

  public getRandiDataObservable(): Observable<RandiDataResponse> {
    return this.rAndIDataObservable;
  }

  private subscription: Subscription | null = null;
  public requestRAndIData(filterData: FilterData): void {
    const req = new HttpRequest<FilterData>('POST', this.baseUrl + "/RAndIProjects", filterData, {responseType: 'json'});
    
    this.subscription = this.http.request(req).subscribe(
      (event: any) => {
        if (event instanceof HttpResponse) {
          if (event.status && event.status != HttpStatusCode.Ok) {
            let errorMessage: String = event.status + ": " + event.statusText
            this.errorFunctions.forEach((errorFunction: Function) => errorFunction(errorMessage));
          } else if (event.status == HttpStatusCode.Ok) {
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
        this.errorFunctions.forEach((errorFunction: Function) => errorFunction(err.message));
        this.subscription?.unsubscribe();
      }
    );
  }

  public forceUpdate(): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', this.baseUrl + "/RAndIProjects/forceUpdate", null);
    return this.http.request(req);
  }

}
