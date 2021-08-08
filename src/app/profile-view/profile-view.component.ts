import { HttpStatusCode } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Occupation } from '../model/occupation';
import { Sector } from '../model/sector';
import { SectorAndOccupationListsResponse } from '../model/sectorAndOccupationListsResponse';
import { Role, User } from '../model/user';
import { UserCRUDResponse } from '../model/userCRUDResponse';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

  @Input() userId?: number;
  @Input() editable: boolean = false;
  user?: User;

  editingOccupation: boolean = false;

  sectorsList?: Sector[];
  occupationsLists?: Occupation[][];
  occupationsList?: Occupation[];

  selectedSector?: Sector;
  selectedOccupation?: Occupation;

  editOccupationErrorMessage: string = "";
  editOccupationSuccesfulMessage: string = "";

  editingPhoneNumber: boolean = false;

  inputedPhoneNumber?: number;

  editPhoneNumberErrorMessage: string = "";
  editPhoneNumberSuccessfulMessage: string = "";

  constructor(private us: UserService) { }

  ngOnInit(): void {
      this.us.requestUser(this.userId).subscribe(
        (event: any) => {
          if (event.status && event.status != HttpStatusCode.Ok) {
              //TODO
          } else if (event.status == HttpStatusCode.Ok) {
            this.user = event.body;
          }
        },
        (err: any) => {
          //TODO
        }
      );
      this.us.requestSectorAndOccupationLists().subscribe(
        (event: any) => {
          if (event.status && event.status != HttpStatusCode.Ok) {
              //TODO
          } else if (event.status == HttpStatusCode.Ok) {
            let resp: SectorAndOccupationListsResponse = event.body;
            this.sectorsList = resp.sectors;
            this.occupationsLists = resp.occupationsBySector;
          }
        },
        (err: any) => {
          //TODO
        }
      )
  }

  public roleNameFromId(id: number): string {
    switch (id) {
      case Role.ADMIN:
        return "Admin";
      case Role.ALOVIEWER:
        return "AloViewer";
      case Role.CONTRIBUTOR:
        return "Contributor";
      case Role.RANDIVIEWER:
        return "RAndIViewer";
      default:
        return "No role";
    }
  }

  editOccupation(): void {
    this.editingOccupation = true;
    this.editOccupationErrorMessage = "";
    this.editOccupationSuccesfulMessage = "";
    this.editPhoneNumberSuccessfulMessage = "";
  }

  sectorSelected(eventTarget: EventTarget | null): void {
    let value = (eventTarget as HTMLInputElement).value;
    let idx = -1;
    this.sectorsList?.forEach((sector: Sector, index: number) => {
      if(sector.description == value) {
        this.selectedSector = sector;
        idx = index;
      }
    })
    if (idx != -1 && this.occupationsLists) {
      this.occupationsList = this.occupationsLists[idx];
    }
  }

  occupationSelected(eventTarget: EventTarget | null): void {
    let value = (eventTarget as HTMLInputElement).value;
    this.occupationsList?.forEach((occupation: Occupation) => {
      if(occupation.description == value) {
        this.selectedOccupation = occupation;
      }
    })
  }

  submitEditOccupation(): void {
    if (!this.selectedSector) {
      this.editOccupationErrorMessage = "Select a Sector"
      return;
    }
    if (!this.selectedOccupation) {
      this.editOccupationErrorMessage = "Select an Occupation"
      return;
    }
    this.us.editOccupationForUser(this.selectedOccupation, this.userId).subscribe(
      (event: any) => {
        if (event.status && event.status != HttpStatusCode.Ok) {
          this.editOccupationErrorMessage = "Failed to edit occupation";
        } else if (event.status == HttpStatusCode.Ok) {
          let resp: UserCRUDResponse = event.body;
          if (resp.status == "error") {
            this.editOccupationErrorMessage = resp.errorMessage;
          } else {
            this.us.requestUser(this.userId).subscribe(
              (event: any) => {
                if (event.status != HttpStatusCode.Ok) {
                    //TODO
                } else {
                  this.user = event.body;
                }
              },
              (err: any) => {
                //TODO
              }
            );
            this.editOccupationSuccesfulMessage = "Successfully edited occupation";
            this.cancelEditOccupation();
          }
        }
      },
      (err: any) => {
        this.editOccupationErrorMessage = "Failed to edit occupation";
      }
    );
  }

  cancelEditOccupation(): void {
    this.editingOccupation = false;
    this.selectedSector = undefined;
    this.occupationsList = undefined;
    this.selectedOccupation = undefined;
    this.editOccupationErrorMessage = "";
  }

  editPhoneNumber(): void {
    this.editingPhoneNumber = true;
    this.editPhoneNumberErrorMessage = "";
    this.editOccupationSuccesfulMessage = "";
    this.editPhoneNumberSuccessfulMessage = "";
  }

  phoneNumberInputed(eventTarget: EventTarget | null):void {
    let value: number|undefined = Number((eventTarget as HTMLInputElement).value);
    if (value == NaN) {
      value = undefined;
    }
    this.inputedPhoneNumber = value;
  }

  submitEditPhoneNumber(): void {
    if (!this.inputedPhoneNumber) {
      this.editPhoneNumberErrorMessage = "Input a phone number"
      return;
    }
    this.us.editPhoneNumberForUser(this.inputedPhoneNumber, this.userId).subscribe(
      (event: any) => {
        if (event.status && event.status != HttpStatusCode.Ok) {
          this.editPhoneNumberErrorMessage = "Failed to edit phone number";
        } else if (event.status == HttpStatusCode.Ok) {
          let resp: UserCRUDResponse = event.body;
          if (resp.status == "error") {
            this.editPhoneNumberErrorMessage = resp.errorMessage;
          } else {
            this.us.requestUser(this.userId).subscribe(
              (event: any) => {
                if (event.status != HttpStatusCode.Ok) {
                    //TODO
                } else {
                  this.user = event.body;
                }
              },
              (err: any) => {
                //TODO
              }
            );
            this.editPhoneNumberSuccessfulMessage = "Successfully edited phone number";
            this.cancelEditPhoneNumber();
          }
        }
      },
      (err: any) => {
        this.editPhoneNumberErrorMessage = "Failed to edit phone number";
      }
    );
  }

  cancelEditPhoneNumber(): void {
    this.editingPhoneNumber = false;
    this.inputedPhoneNumber = undefined;
    this.editPhoneNumberErrorMessage = "";
  }

}
