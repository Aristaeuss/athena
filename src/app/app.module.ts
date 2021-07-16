import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DataTablesModule } from 'angular-datatables';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SortPipe } from './pipe/sort.pipe';

import { RandiComponent } from './randi/randi.component';
import { RandihomeComponent } from './randihome/randihome.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { ChartsModule } from 'ng2-charts';



@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomepageComponent,
        RandiComponent,
        RandihomeComponent,
        SortPipe,
        BarChartComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        DataTablesModule,
        NgxChartsModule,
        ChartsModule,
        RouterModule.forRoot([
          {path: 'randihome', component: RandihomeComponent},
          {path: 'randi', component: RandiComponent},
          {path: 'homepage', component: HomepageComponent},
          {path: '', component: LoginComponent}
      ])
    ],
    providers: [
        SortPipe
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
