import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddInstitutionComponent } from './add-institution/add-institution.component';

import { AuthGuard } from './guards/auth.guard';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { ProfileManagementComponent } from './profile-management/profile-management.component';
import { ProfileComponent } from './profile/profile.component';
import { RandiComponent } from './randi/randi.component';
import { RandihomeComponent } from './randihome/randihome.component';

const routes: Routes = [
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'management/profiles', component: ProfileManagementComponent, canActivate: [AuthGuard]},
  {path: 'institutions/add', component: AddInstitutionComponent, canActivate: [AuthGuard]},
  {path: 'randihome', component: RandihomeComponent, canActivate: [AuthGuard]},
  {path: 'randi', component: RandiComponent, canActivate: [AuthGuard]},
  {path: 'homepage', component: HomepageComponent, canActivate: [AuthGuard]},
  {path: '', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
