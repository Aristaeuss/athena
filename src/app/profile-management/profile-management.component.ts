import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { OrderType, UserSearchFilterData } from '../model/userSearchFilterData';
import { UsersListResponse } from '../model/usersListResponse';
import { UserService } from '../services/user.service';

const NUMBER_RESULTS_PER_PAGE = 5;

@Component({
  selector: 'app-profile-management',
  templateUrl: './profile-management.component.html',
  styleUrls: ['./profile-management.component.scss']
})
export class ProfileManagementComponent implements OnInit {

  usersToDisplay: User[] = [];
  userIdToShowProfileFor?: number;

  nameFilter: string = "";

  currentPage: number = 1;
  numberOfDataLeft: number = 0;
  numberOfPages: number = 0;
  numberOfEntries: number = 0;

  isUsersListShown: boolean = true;
  isAddUserPageShown: boolean = false;

  
    // Image Paths
    usersIconPath = "/assets/images/users-icon.svg";
    addUserIconPath = "/assets/images/add_user-icon.svg";

  constructor(private us: UserService) { }

  ngOnInit(): void {
    this.refreshUsersList();
  }

  private refreshUsersList(): void {
    this.us.requestUsersList(this.generateFilterData()).subscribe(
      (event: any) => {
        if (event.status && event.status != HttpStatusCode.Ok) {
            //TODO
        } else if (event.status == HttpStatusCode.Ok) {
          let resp: UsersListResponse = event.body;
          if (resp.status === "success") {
              this.usersToDisplay = resp.users;
              this.numberOfDataLeft = resp.numUsersLeft;
              this.reCalculatePageInfo();
          } else {
            //TODO
          }
        }
      },
      (err: any) => {
        //TODO
      }
    );
  }

  viewProfile(userId: number): void {
    this.userIdToShowProfileFor = userId;
  }

  closePopup(): void {
    this.userIdToShowProfileFor = undefined;
  }

  ClearFilter(): void {
    this.nameFilter = "";
    this.currentPage = 1;
    this.refreshUsersList();
  }
  
  nameFilterChanged(eventTarget: EventTarget | null): void {
    this.nameFilter = (eventTarget as HTMLInputElement).value;
    this.currentPage = 1;
    this.refreshUsersList();
  }

  private generateFilterData(): UserSearchFilterData {
    let indexFirst = NUMBER_RESULTS_PER_PAGE*(this.currentPage - 1);
    return {
        nameFilter: this.nameFilter,
        nameOrder: OrderType.ASCENDING,
        indexFirstResult: indexFirst,
        indexLastResult: indexFirst + NUMBER_RESULTS_PER_PAGE - 1
    }
  }
  
  NextPage():void {
    if (this.numberOfDataLeft > 0) {
        this.currentPage++;
        this.refreshUsersList();
    }
  }

  PreviousPage():void {
    if (this.currentPage > 1) {
        this.currentPage--;
        this.refreshUsersList();
    }
  }

  reCalculatePageInfo(): void {
      this.numberOfEntries = (NUMBER_RESULTS_PER_PAGE * this.currentPage) +
                             ((this.numberOfDataLeft == 0) ? (this.usersToDisplay.length - NUMBER_RESULTS_PER_PAGE) : this.numberOfDataLeft);
      this.numberOfPages = Math.floor(this.numberOfEntries / NUMBER_RESULTS_PER_PAGE) +
                           ((this.numberOfEntries % NUMBER_RESULTS_PER_PAGE) == 0 ? 0 : 1);
  }

  toggleShowUsersList(): void {
    this.isAddUserPageShown = false;
    this.isUsersListShown = !this.isUsersListShown;
  }

  toggleShowAddUserPage(): void {
    this.isUsersListShown = false;
    this.isAddUserPageShown = !this.isAddUserPageShown;
  }

}
