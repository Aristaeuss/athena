export interface FilterData {
    countryFilter: string;
    countryOrder: OrderType;
    gblProgramFilter: string;
    gblProgramOrder: OrderType;
    partnerNameFilter: string;
    partnerNameOrder: OrderType;
    partnerLocationFilter: string;
    partnerLocationOrder: OrderType;
    modelOfCollaborationTypeFilter: string;
    modelOfCollaborationTypeOrder: OrderType;
    indexFirstResult: Number;
    indexLastResult: Number;
}

export enum OrderType {
    ASCENDING,
    DESCENDING,
    NONE,
}