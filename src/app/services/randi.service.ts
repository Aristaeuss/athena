import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpEventType, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { RandiData } from '../model/randiData';
import { FilterData, OrderType } from '../model/filterData';
import { RandihomeComponent } from '../randihome/randihome.component';

const defaultFilters : FilterData = {
  countryFilter: "",
  countryOrder: OrderType.NONE,
  gblProgramFilter: "",
  gblProgramOrder: OrderType.NONE,
  partnerNameFilter: "",
  partnerNameOrder: OrderType.NONE,
  partnerLocationFilter: "",
  partnerLocationOrder: OrderType.NONE,
  modelOfCollaborationTypeFilter:"",
  modelOfCollaborationTypeOrder: OrderType.NONE,
  indexFirstResult: 0,
  indexLastResult: -1
 }

@Injectable({
  providedIn: 'root'
})

export class RandiService {


  private baseUrl = 'http://localhost:8080';
  
  constructor(private http: HttpClient) { }

  private subscription: Subscription | null = null;
  
  private notifyFunctions: Function[] = [];
  private errorFunctions: Function[] = [];

  private rAndIDataObservable: Observable<RandiData[]> = new Observable((observer) => {
    let notiFunc = (projects: RandiData[]) => observer.next(projects);
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



  getRandiData(): Observable<RandiData[]> {
    this.requestRAndIData(defaultFilters);
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
            this.notifyFunctions.forEach((notifyFunction: Function) => notifyFunction(event.body.RAndIProjects));
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
