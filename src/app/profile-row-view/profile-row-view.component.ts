import { HttpStatusCode } from '@angular/common/http';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { RolesListResponse } from '../model/rolesListResponse';
import { Role, User } from '../model/user';
import { UserCRUDResponse } from '../model/userCRUDResponse';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile-row-view',
  templateUrl: './profile-row-view.component.html',
  styleUrls: ['./profile-row-view.component.scss']
})
export class ProfileRowViewComponent implements OnInit {

  @Input() userId?: number;
  @Input() editable: boolean = false;
  user?: User;

  rolesList?: Role[];
  selectedRole?: Role;

  editingRole: boolean = false;

  editRoleErrorMessage: string = "";
  editRoleSuccesfulMessage: string = "";
  
  constructor(private us: UserService) { 
  }

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
    this.us.requestRolesList().subscribe(
      (event: any) => {
        if (event.status && event.status != HttpStatusCode.Ok) {
            //TODO
        } else if (event.status == HttpStatusCode.Ok) {
          let resp: RolesListResponse = event.body;
          this.rolesList = resp.roles;
        }
      },
      (err: any) => {
        //TODO
      }
    );
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

  private roleIdFromRole(role: Role): number {
    let roleString = role.toString();
    switch (roleString) {
      case "ADMIN":
        return 1;
      case "CONTRIBUTOR":
        return 2;
      case "ALOVIEWER":
        return 3;
      case "RANDIVIEWER":
        return 4;
      default:
        return -1;
    }
  }

  editRole(): void {
    this.editingRole = true;
    this.editRoleErrorMessage = "";
    this.editRoleSuccesfulMessage = "";
  }

  roleSelected(eventTarget: EventTarget | null): void {
    let value = (eventTarget as HTMLInputElement).value;
    this.rolesList?.forEach((role: Role) => {
      if(role.toString() == value.toString()) {
        this.selectedRole = role;
      }
    })
  }

  submitEditRole(): void {
    if (!this.selectedRole) {
      this.editRoleErrorMessage = "Select a Role"
      return;
    }
    this.us.editRoleForUser(this.roleIdFromRole(this.selectedRole), this.userId).subscribe(
      (event: any) => {
        if (event.status && event.status != HttpStatusCode.Ok) {
          this.editRoleErrorMessage = "Failed to edit role";
        } else if (event.status == HttpStatusCode.Ok) {
          let resp: UserCRUDResponse = event.body;
          if (resp.status == "error") {
            this.editRoleErrorMessage = resp.errorMessage;
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
            this.editRoleSuccesfulMessage = "Successfully edited role";
            this.cancelEditRole();
          }
        }
      },
      (err: any) => {
        this.editRoleErrorMessage = "Failed to edit role";
      }
    );
  }

  cancelEditRole(): void {
    this.editingRole = false;
    this.selectedRole = undefined;
    this.editRoleErrorMessage = "";
  }

}
