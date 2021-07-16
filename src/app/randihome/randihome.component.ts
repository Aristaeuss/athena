import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { ChartOptions, ChartType } from 'chart.js';

import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

import { FieldLists } from '../model/fieldLists';
import { FilterData, OrderType } from '../model/filterData';
import { RandiData } from '../model/randiData';
import { RandiDataResponse } from '../model/randiDataResponse';
import { RandiService } from '../services/randi.service';


const NUMBER_RESULTS_PER_PAGE = 5;
const EXPECTED_MAX_NUMBER_OF_COLORS = 50;

@Component({
    selector: 'app-randihome',
    templateUrl: './randihome.component.html',
    styleUrls: ['./randihome.component.scss']
})

export class RandihomeComponent implements OnInit, OnDestroy {

    randiDataArray: RandiData[] = [];

    randiDataFieldLists: FieldLists =  {
        countryFields: [],
        gblProgramFields: [],
        partnerNameFields: [],
        partnerLocationFields: [],
        modelOfCollaborationTypeFields: [],
        countryFieldsCounts: [],
        gblProgramFieldsCounts: [],
        partnerNameFieldsCounts: [],
        partnerLocationFieldsCounts: [],
        modelOfCollaborationTypeFieldsCounts: [],
    };




    chartTypeList = [
        { id: 1, value: "bar", name: "BAR", isSelected: false},
        { id: 2, value: "horizontalBar", name: "HORIZONTAL BAR", isSelected: false},
        { id: 3, value: "doughnut", name: "DOUGHNUT", isSelected: false},
        { id: 4, value: "pie", name: "PIE", isSelected: false}
    ];

    // Boolean
    isShown: boolean = false ;
    isChartShown: boolean = false;
    isTableShown: boolean = false;
    isOderShown: boolean = false;
    popup: boolean = false;
    firstSearchMade: boolean = false;

    // Images
    filterIcon = "/assets/images/filter_icon_dshb.png";
    chartIcon = "/assets/images/piechart_icon.png";
    tableIcon = "/assets/images/table_icon.png";

    //Subscription
    subscription?: Subscription;

    //Numbers
    currentPage: number = 1;
    numberOfDataLeft: number = 0;
    excelLastUpdateTime: string = "";
    numberOfPages: number = 0;
    numberOfEntries: number = 0;

    //Strings
    country = "";
    gblProgram = "";
    partnerName = "";
    partnerLocation = "";
    modelOfCollaborationType = "";
    lastUpdateDate = "";
    lastUpdateTime = "";

    public pieChartOptions: ChartOptions = {
        responsive: true,
    };
    public countryPieChartLabels: Label[] = [];
    public gblProgramPieChartLabels: Label[] = [];
    public partnerNamePieChartLabels: Label[] = [];
    public partnerLocationPieChartLabels: Label[] = [];
    public modelOfCollaborationPieChartLabels: Label[] = [];
    public countryPieChartData: SingleDataSet = this.getInitialDataArray();
    public gblProgramPieChartData: SingleDataSet = this.getInitialDataArray();
    public partnerNamePieChartData: SingleDataSet = this.getInitialDataArray();
    public partnerLocationPieChartData: SingleDataSet = this.getInitialDataArray();
    public modelOfCollaborationPieChartData: SingleDataSet = this.getInitialDataArray();

    public pieChartType: ChartType = 'pie';
    public pieChartLegend = true;
    public pieChartPlugins = [];

    constructor(public rs: RandiService) {
        monkeyPatchChartJsTooltip();
        monkeyPatchChartJsLegend();
    }

    radioSelected: any;
    isAllSelected(chart: any) {
        this.pieChartType = this.radioSelected;
    }

    getInitialDataArray(): number[] {
        let temp = [];
        for(let i = 0; i < EXPECTED_MAX_NUMBER_OF_COLORS; i++){
            temp.push(0);
        }
        return temp;
    }

    ngOnInit(): void {
        this.subscription = this.rs.getRandiData(this.generateFilterData()).subscribe({
            next: (randiDataResponse: RandiDataResponse) => {
                this.randiDataArray = randiDataResponse.randiData;
                this.randiDataFieldLists = randiDataResponse.fieldLists;
                this.numberOfDataLeft = randiDataResponse.numberOfDataLeft;
                this.excelLastUpdateTime = randiDataResponse.excelLastUpdateTime;

                this.countryPieChartLabels = this.randiDataFieldLists.countryFields;
                this.countryPieChartData = this.randiDataFieldLists.countryFieldsCounts;

                this.gblProgramPieChartLabels = this.randiDataFieldLists.gblProgramFields;
                this.gblProgramPieChartData = this.randiDataFieldLists.gblProgramFieldsCounts;

                this.partnerLocationPieChartLabels = this.randiDataFieldLists.partnerLocationFields;
                this.partnerLocationPieChartData = this.randiDataFieldLists.partnerLocationFieldsCounts;

                this.partnerNamePieChartLabels = this.randiDataFieldLists.partnerNameFields;
                this.partnerNamePieChartData = this.randiDataFieldLists.partnerNameFieldsCounts;

                this.modelOfCollaborationPieChartLabels = this.randiDataFieldLists.modelOfCollaborationTypeFields;
                this.modelOfCollaborationPieChartData = this.randiDataFieldLists.modelOfCollaborationTypeFieldsCounts;
                this.SplitExcelLastUpdateTime();
                this.reCalculatePageInfo();
            },
            error: (err: any) => { } //TODO
        });
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    SplitExcelLastUpdateTime(): void {
        this.lastUpdateDate = this.excelLastUpdateTime.substr(0,10);
        this.lastUpdateTime = this.excelLastUpdateTime.substr(11,5);
    }

    Search(): void {
        this.firstSearchMade = true;
        this.currentPage = 1;
        this.rs.refreshRAndiData(this.generateFilterData());
    }

    ClearFilter(): void {
        this.country = "";
        this.gblProgram = "";
        this.partnerName = "";
        this.partnerLocation = "";
        this.modelOfCollaborationType = "";
        this.firstSearchMade = false;
        this.currentPage = 1;
        this.rs.refreshRAndiData(this.generateFilterData());
    }

    reCalculatePageInfo(): void {
        this.numberOfEntries = (NUMBER_RESULTS_PER_PAGE * this.currentPage) +
                               ((this.numberOfDataLeft == 0) ? (this.randiDataArray.length - NUMBER_RESULTS_PER_PAGE) : this.numberOfDataLeft);
        this.numberOfPages = Math.floor(this.numberOfEntries / NUMBER_RESULTS_PER_PAGE) +
                             ((this.numberOfEntries % NUMBER_RESULTS_PER_PAGE) == 0 ? 0 : 1);

    }

    private generateFilterData(): FilterData {
        let indexFirst = NUMBER_RESULTS_PER_PAGE*(this.currentPage - 1);
        return {
            countryFilter: this.country,
            countryOrder: OrderType.ASCENDING,
            gblProgramFilter: this.gblProgram,
            gblProgramOrder: OrderType.ASCENDING,
            partnerNameFilter: this.partnerName,
            partnerNameOrder: OrderType.ASCENDING,
            partnerLocationFilter: this.partnerLocation,
            partnerLocationOrder: OrderType.ASCENDING,
            modelOfCollaborationTypeFilter: this.modelOfCollaborationType,
            modelOfCollaborationTypeOrder: OrderType.ASCENDING,
            indexFirstResult: indexFirst,
            indexLastResult: indexFirst + NUMBER_RESULTS_PER_PAGE - 1
        }
    }

    isFirstSearchMade() {
        return this.firstSearchMade;
    }

    randiDataSelected: RandiData | undefined;
    ShowFullDetails(idSelect: number) {
        this.randiDataSelected =  this.randiDataArray.find((randiData: RandiData) => {
            return idSelect == randiData.id;
        });
        this.popup = true;
    }

    toggleShowFilterList() {
        this.isShown =! this.isShown;
    }

    toggleShowChartList() {
        return this.isChartShown =! this.isChartShown;
    }

    toggleShowTableList() {
      return this.isTableShown =! this.isTableShown;
  }

  toggleShowOderList() {
    return this.isOderShown =! this.isOderShown;
}

    NextPage():void {
        if (this.numberOfDataLeft > 0) {
            this.currentPage++;
        }
        this.rs.refreshRAndiData(this.generateFilterData());
    }

    PreviousPage():void {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
        this.rs.refreshRAndiData(this.generateFilterData());
    }

}
