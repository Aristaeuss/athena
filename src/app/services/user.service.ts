import { HttpClient, HttpEvent, HttpRequest, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Occupation } from '../model/occupation';
import { RolesListResponse } from '../model/rolesListResponse';
import { SectorAndOccupationListsResponse } from '../model/sectorAndOccupationListsResponse';
import { Role, User } from '../model/user';
import { UserSearchFilterData } from '../model/userSearchFilterData';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public requestUser(userId?: number): Observable<HttpEvent<User>> {
    const req = new HttpRequest('GET', this.baseUrl + "/users/getUser" + (userId ? ("/" + userId) : ""), null);
    return this.http.request(req);
  }

  public requestUsersList(filterData: UserSearchFilterData): Observable<HttpEvent<User>> {
    const req = new HttpRequest('POST', this.baseUrl + "/users/getUsers", filterData, {responseType: 'json'});
    return this.http.request(req);
  }

  public requestSectorAndOccupationLists(): Observable<HttpEvent<SectorAndOccupationListsResponse>> {
    const req = new HttpRequest('GET', this.baseUrl + "/occupations/sectorAndOccupationLists", null);
    return this.http.request(req);
  }

  public requestRolesList(): Observable<HttpEvent<RolesListResponse>> {
    const req = new HttpRequest('GET', this.baseUrl + "/users/rolesList", null);
    return this.http.request(req);
  }

  public editOccupationForUser(newOccupation: Occupation, userId?: number) {
    const req = new HttpRequest('POST', this.baseUrl + "/users/editUserOccupation" + (userId ? ("/" + userId) : ""), newOccupation);
    return this.http.request(req);
  }

  public editPhoneNumberForUser(newPhoneNumber: number, userId?: number) {
    const req = new HttpRequest('POST', this.baseUrl + "/users/editUserPhoneNumber" + (userId ? ("/" + userId) : ""), newPhoneNumber);
    return this.http.request(req);
  }

  public editRoleForUser(newRoleId: number, userId?: number) {
    const req = new HttpRequest('POST', this.baseUrl + "/users/editUserRole" + (userId ? ("/" + userId) : ""), newRoleId);
    return this.http.request(req);
  }

}
