export interface UserSearchFilterData {
    nameFilter: string,
    nameOrder: OrderType,
    indexFirstResult: Number;
    indexLastResult: Number;
}

export enum OrderType {
    ASCENDING,
    DESCENDING,
    NONE,
}