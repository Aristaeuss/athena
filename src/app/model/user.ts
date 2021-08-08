import { Occupation } from "./occupation";

export interface User {
    id: number;
    roleId: number;
    occupation?: Occupation;
    name: string;
    email: string;
    phoneNumber?: number;
}

export enum Role {
    ADMIN = 1,
    CONTRIBUTOR = 2,
    ALOVIEWER = 3,
    RANDIVIEWER = 4
}