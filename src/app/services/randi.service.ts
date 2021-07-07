import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { randiData } from '../model/randiData';

@Injectable({
  providedIn: 'root'
})
export class RandiService {

  constructor(private http: HttpClient) { }

  url: string = "http://localhost:4200/randiData";
  getRandiData() {
    return this.http.get<randiData[]>(this.url);
  }

}
