import { Component, OnInit } from '@angular/core';

import { RandiData } from '../model/randiData';
import { RandiService } from '../services/randi.service';
import { FilterData, OrderType } from '../model/filterData';

@Component({
    selector: 'app-randihome',
    templateUrl: './randihome.component.html',
    styleUrls: ['./randihome.component.scss']
})

export class RandihomeComponent implements OnInit {

    randiDataArray: RandiData[] = [];
    filteredRAndIDataArray: RandiData[] = [];

    popup = false;
    firstSearchMade: boolean = false;

    country = "";
    gblProgram = "";
    partnerName = "";
    partnerLocation = "";
    modelOfCollaborationType = "";

    constructor(public rs: RandiService) { }

    ngOnInit(): void {
        this.rs.getRandiData().subscribe({
            next: (rAndIDataArray: RandiData[]) => { 
                this.randiDataArray = rAndIDataArray;
                this.filterData();
            },
            error: (err: any) => { } //TODO
        })
    }

    Search(): void {
        this.firstSearchMade = true;
        this.filterData();
    }

    private filterData(): void {
        this.filteredRAndIDataArray = this.randiDataArray.filter(res => {
            return res.country.toLocaleLowerCase().match(this.country.toLocaleLowerCase()) && 
                   res.gblProgram.toLocaleLowerCase().match(this.gblProgram.toLocaleLowerCase()) && 
                   res.partnerName.toLocaleLowerCase().match(this.partnerName.toLocaleLowerCase()) && 
                   res.partnerLocation.toLocaleLowerCase().match(this.partnerLocation.toLocaleLowerCase()) && 
                   res.modelOfCollaborationType.toLocaleLowerCase().match(this.modelOfCollaborationType.toLocaleLowerCase());
        })
    }

    ClearFilter() {
        this.country = "";
        this.gblProgram = "";
        this.partnerName = "";
        this.partnerLocation = "";
        this.modelOfCollaborationType = "";
        this.firstSearchMade = false;
        this.rs.refreshRAndiData(this.generateFilterData());
    }

    private generateFilterData(): FilterData {
        return {
            countryFilter: this.country,
            countryOrder: OrderType.NONE,
            gblProgramFilter: this.gblProgram,
            gblProgramOrder: OrderType.NONE,
            partnerNameFilter: this.partnerName,
            partnerNameOrder: OrderType.NONE,
            partnerLocationFilter: this.partnerLocation,
            partnerLocationOrder: OrderType.NONE,
            modelOfCollaborationTypeFilter: this.modelOfCollaborationType,
            modelOfCollaborationTypeOrder: OrderType.NONE,
            indexFirstResult: 0,
            indexLastResult: -1
        }
    }

    isFirstSearchMade() {
        return this.firstSearchMade;
    }

}