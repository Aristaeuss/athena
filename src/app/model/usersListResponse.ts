import { User } from "./user";

export interface UsersListResponse {
    status: string;
    errorMessage: string;
    users: User[];
    numUsersLeft: number;
}