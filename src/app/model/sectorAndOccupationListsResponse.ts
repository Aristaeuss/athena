import { Occupation } from "./occupation";
import { Sector } from "./sector";

export interface SectorAndOccupationListsResponse {
    sectors: Sector[];
    occupationsBySector: Occupation[][];
}