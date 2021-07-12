import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { RandiComponent } from './randi/randi.component';
import { RandihomeComponent } from './randihome/randihome.component';

const routes: Routes = [
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
