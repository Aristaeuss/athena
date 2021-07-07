import { Component, OnInit } from '@angular/core';

import { randiData } from '../model/randiData';
import { RandiService } from '../services/randi.service';

@Component({
  selector: 'app-randi',
  templateUrl: './randi.component.html',
  styleUrls: ['./randi.component.scss']
})
export class RandiComponent implements OnInit {

  randiData: randiData[] = [];

  constructor(public rs: RandiService) { }

  ngOnInit(): void {
    this.rs.getRandiData().subscribe((response) => {
      this.randiData=response;
    })
  }

}
