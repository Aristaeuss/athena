import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';

import { RandiComponent } from './randi/randi.component';
import { RandihomeComponent } from './randihome/randihome.component';
import { UnicoPipe } from './unico.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    RandiComponent,
    RandihomeComponent,
    UnicoPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'randihome', component: RandihomeComponent},
      {path: 'randi', component: RandiComponent},
      {path: 'homepage', component: HomepageComponent},
      {path: '', component: LoginComponent}
    ])
  ],
  providers: [UnicoPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
