import { FieldLists } from "./fieldLists";
import { RandiData } from "./randiData";

export interface RandiDataResponse {
    fieldLists: FieldLists;
    randiData: RandiData[];
    numberOfDataLeft: number;
    excelLastUpdateTime: string;
}