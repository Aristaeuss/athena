import { Component, OnDestroy, OnInit } from '@angular/core';

import { RandiData } from '../model/randiData';
import { RandiDataResponse } from '../model/randiDataResponse';
import { RandiService } from '../services/randi.service';

import { FilterData, OrderType } from '../model/filterData';

import { Subject, Subscription } from 'rxjs';

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

@Component({
    selector: 'app-randi',
    templateUrl: './randi.component.html',
    styleUrls: ['./randi.component.scss']
})

export class RandiComponent implements OnInit, OnDestroy {

    randiDataArray: RandiData[] = []; 
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();
    subscription?: Subscription;

    constructor(public rs: RandiService) { }

    ngOnInit(): void {
        this.subscription = this.rs.getRandiDataObservable().subscribe({
            next: (randiDataAndFields: RandiDataResponse) => { 
                this.randiDataArray = randiDataAndFields.randiData;
                this.dtTrigger.next();
            },
            error: (err: any) => {
                console.log(err); 
            } //TODO
        });
        this.rs.requestRAndIData(defaultFilters)

        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10
        };
    }

    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
        this.subscription?.unsubscribe();
    }
}
