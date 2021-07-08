import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RandiData } from '../model/randiData';

@Injectable({
  providedIn: 'root'
})
export class RandiService {

  constructor(private http: HttpClient) { }

  url: string = "http://localhost:3000/randiData";
  getRandiData() {
    return this.http.get<RandiData[]>(this.url);
  }

}
